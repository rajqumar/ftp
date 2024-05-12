import { takeLatest, put, call } from 'redux-saga/effects';

import { loginUser } from './actions';
import axios from 'axios';

export function* loginRequest(action) {
  const { values } = action.payload;

  try {
    yield put(loginUser.request());

    var url = 'http://ftp-backend-git-ftp-backends.apps.us-east-1.starter.openshift-online.com/api/login/';

    const response = yield call(() => axios.post(url, values));

    localStorage.setItem('ftp_token', response.data.success.data.token);
    yield put(loginUser.success(response.data.success.data.token));
  } catch (err) {
    yield put(loginUser.failure(err));
  } finally {
    yield put(loginUser.fulfill());
  }
}

export default function* dataShowcases() {
  yield takeLatest(loginUser.TRIGGER, loginRequest);
}
