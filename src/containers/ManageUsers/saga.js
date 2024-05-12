import { takeLatest, put, call, takeLeading, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { createUser, getUserRoles, getUsersList, makeUserActiveDeactive } from './actions';
import axios from 'axios';
import Router from 'next/router';

export function* createUserRequest(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }
  const base_url = process.env.API_URL;

  try {
    yield put(createUser.request());
    const url = `${base_url}/company-user/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      values.is_active = values.is_active === 'checked' ? true : false;
      const userCreatedResponse = yield call(() => axios.post(url, values, headers));

      if (userCreatedResponse.status == 200) {
        const userType = action.payload.props.title == 'Create Admin' ? 'Admin' : 'User';
        toast.success(`${userType} created successfully !`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        yield put(createUser.success(userCreatedResponse.data.success.data));
        setTimeout(() => {
          Router.reload();
        }, 2000);
      }
    }
  } catch (err) {
    const { email } = action.payload.values;
    if (
      err.response.data.error.status_code == 500 &&
      err.response.data.error.message.includes(`(${email}) already exists`)
    ) {
      toast.error('Email already exists', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
      });
    } else {
      toast.warn(err.response.data.error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
      });
    }
    yield put(createUser.failure(err));
  } finally {
    yield put(createUser.fulfill());
  }
}

export function* userRolesRequest(action) {
  const { payload } = action;
  const base_url = process.env.API_URL;

  try {
    yield put(getUserRoles.request());
    const userRolesUrl = `${base_url}/user-roles/`;
    const userRolesresponse = yield call(() => axios.get(userRolesUrl));

    if (userRolesresponse.status == 200) {
      if (payload == 'Create User') {
        yield put(getUserRoles.success(userRolesresponse.data.success.data.company_users));
      } else {
        yield put(getUserRoles.success(userRolesresponse.data.success.data.company_admins));
      }
    }
  } catch (err) {
    yield put(getUserRoles.failure(err));
  } finally {
    yield put(getUserRoles.fulfill());
  }
}

export function* userListRequest() {
  const base_url = process.env.API_URL;

  try {
    yield put(getUsersList.request());
    const userListUrl = `${base_url}/company-user/`;
    const token = window.localStorage.getItem('ftp_token');

    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const userListResponse = yield call(() => axios.get(userListUrl, headers));

      if (userListResponse.status == 200) {
        yield put(getUsersList.success(userListResponse.data.success.data));
      }
    }
  } catch (err) {
    yield put(getUsersList.failure(err));
  } finally {
    yield put(getUsersList.fulfill());
  }
}

export function* getUserActiveDeactive(action) {
  const {
    payload: { status, userid },
  } = action;
  const base_url = process.env.API_URL;
  let values = {};
  try {
    if (status == 'Active') {
      values = {
        is_active: false,
      };
    } else {
      values = {
        is_active: true,
      };
    }

    yield put(makeUserActiveDeactive.request());
    const url = `${base_url}/company-user/${userid}/`;
    const token = window.localStorage.getItem('ftp_token');

    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const userActiveResponse = yield call(() => axios.put(url, values, headers));

      if (userActiveResponse.status == 200) {
        yield put(makeUserActiveDeactive.success(userActiveResponse.data.success.data));
      }
    }
  } catch (err) {
    yield put(makeUserActiveDeactive.failure(err));
  } finally {
    yield put(makeUserActiveDeactive.fulfill());
  }
}

export default function* profileData() {
  yield takeLatest(createUser.TRIGGER, createUserRequest);
  yield takeLatest(getUserRoles.TRIGGER, userRolesRequest);
  yield takeLeading(getUsersList.TRIGGER, userListRequest);
  yield takeEvery(makeUserActiveDeactive.TRIGGER, getUserActiveDeactive);
}
