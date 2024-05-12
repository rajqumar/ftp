import { takeLatest, put, call } from 'redux-saga/effects';

import { forgetPassword } from './actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import Router from 'next/router';

const base_url = process.env.API_URL;
export function* forgetPasswordRequest(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const forgetPasswdbody = {
    email: values.email,
  };

  try {
    yield put(forgetPassword.request());
    const url = `${base_url}/forget-password/`;
    const forgetPasswordResponse = yield call(() => axios.post(url, forgetPasswdbody));

    if (forgetPasswordResponse.status === 202) {
      toast.success(forgetPasswordResponse.data.success.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      yield put(forgetPassword.success(forgetPasswordResponse.data.success.data));
      setTimeout(() => {
        Router.push('/');
      }, 3000);
    }
  } catch (err) {
    if (err.response.status == 404) {
      toast.error(err.response.data.success.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
      });
    }
    yield put(forgetPassword.failure(err.response.data));
  } finally {
    yield put(forgetPassword.fulfill());
  }
}

export default function* dashboardData() {
  yield takeLatest(forgetPassword.TRIGGER, forgetPasswordRequest);
}
