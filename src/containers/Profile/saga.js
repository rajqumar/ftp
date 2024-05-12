import { takeLatest, put, call } from 'redux-saga/effects';

import { getProfileData } from './actions';
import axios from 'axios';
import { toast } from 'react-toastify';

export function* profileRequest(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }
  const api = process.env.API_URL;
  try {
    yield put(getProfileData.request());
    var url = values && values !== undefined ? `${api}/update-company/` : `${api}/company-user/?my_profile=true`;

    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response =
      values && values !== undefined
        ? yield call(() => axios.put(url, values, headers))
        : yield call(() => axios.get(url, headers));
    if (response.status == 201) {
      toast.success(response.data.success.data.success, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
      });
    }

    yield put(getProfileData.success(response.data.success.data));
    window.localStorage.setItem('user_id', response.data.success.data.id);
  } catch (err) {
    yield put(getProfileData.failure(err));
  } finally {
    yield put(getProfileData.fulfill());
  }
}

export default function* profileData() {
  yield takeLatest(getProfileData.TRIGGER, profileRequest);
}
