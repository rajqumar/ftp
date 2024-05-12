import { takeLatest, put, call } from 'redux-saga/effects';

import { loginUser } from './actions';
import axios from 'axios';
import { toast } from 'react-toastify';

export function* loginRequest(action) {
  const { values } = action.payload;
  const api = process.env.API_URL;

  try {
    yield put(loginUser.request());

    var url = `${api}/login/`;

    const response = yield call(() => axios.post(url, values));
    if (localStorage.getItem('rememberme') != null && localStorage.getItem('rememberme') == 'true') {
      localStorage.setItem('userEmail', values.email);
    } else {
      localStorage.removeItem('userEmail');
    }

    var { token, role } = response.data.success.data;
    var cu = role && role[0] ? role[0] : '';

    const now = new Date();
    const expirytimeStamp = now.setDate(now.getDate() + 5);
    const expiry_date = new Date(expirytimeStamp);

    localStorage.setItem('ftp_token', token);
    localStorage.setItem('ftp_role', cu);
    localStorage.setItem('ftp_token_expiry', expiry_date);

    yield put(loginUser.success(response.data.success.data));
  } catch (err) {
    yield put(loginUser.failure(err.response.data.error.message.error));
  } finally {
    yield put(loginUser.fulfill());
  }
}

export default function* dataShowcases() {
  yield takeLatest(loginUser.TRIGGER, loginRequest);
}
