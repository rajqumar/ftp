import { takeLatest, put, call } from 'redux-saga/effects';
import Router from 'next/router';

import { getDashboardData } from './actions';
import axios from 'axios';

const base_url = process.env.API_URL;
export function* dashboardRequest() {
  try {
    yield put(getDashboardData.request());
    const url = `${base_url}/dashboard/`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const dashboardResponse = yield call(() => axios.get(url, headers));

    if (dashboardResponse.status == 200) {
      yield put(getDashboardData.success(dashboardResponse.data.success.data));
    }
  } catch (err) {
    if (err.response.status == 403) {
      window.localStorage.removeItem('ftp_token');
      Router.push('/login');
    }
    yield put(getDashboardData.failure(err));
  } finally {
    yield put(getDashboardData.fulfill());
  }
}

export default function* dashboardData() {
  yield takeLatest(getDashboardData.TRIGGER, dashboardRequest);
}
