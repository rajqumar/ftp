import { takeLatest, takeLeading, put, call } from 'redux-saga/effects';

import { getSOList, getSOView, createDO, soStatusAction } from './actions';
import axios from 'axios';
const api = process.env.API_URL;

export function* soRequest() {
  try {
    yield put(getSOList.request());
    var url = `${api}/so/`;
    var user = window.localStorage.getItem('current_user');
    if(user === 'buyer') {
      url = `${api}/so/?buyer=${true}/`;
    } else if(user === 'seller') {
      url = `${api}/so/?seller=${true}/`;
    }

    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(getSOList.success(response.data.success.data));
  } catch (err) {
    yield put(getSOList.failure(err));
  } finally {
    yield put(getSOList.fulfill());
  }
}

export function* soViewReq(action) {
  var so_id;
  if (action.payload && action.payload) {
    so_id = action.payload;
  }

  try {
    yield put(getSOView.request());

    var url = `${api}/so/${so_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getSOView.success(response.data.success.data));
  } catch (err) {
    yield put(getSOView.failure(err));
  } finally {
    yield put(getSOView.fulfill());
  }
}

export function* createDOReq(action) {
  var values;
  var formData = new FormData();
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(createDO.request());
    const url = `${base_url}/do/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      formData.append('invoice', values.invoice);
      formData.append('sales_order_id', values.sales_order_id);
      formData.append('shipment_no', values.shipment_no);

      const response = yield call(() => axios.post(url, formData, headers));

      yield put(createDO.success(response.data.success.data));
    }
  } catch (err) {
    yield put(createDO.failure(err));
  } finally {
    yield put(createDO.fulfill());
  }
}

export function* soStatusActionReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(soStatusAction.request());
    const url = `${base_url}/so/action/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    
    if(values.status === undefined) {
      values['status'] = 'buyer_approved',
      values['note'] = ''
    }

    const response = yield call(() => axios.post(url, values, headers));
      yield put(soStatusAction.success(response.data.success.data));
    }
  } catch (err) {
    yield put(soStatusAction.failure(err));
  } finally {
    yield put(soStatusAction.fulfill());
  }
}

export default function* soData() {
  yield takeLeading(getSOList.TRIGGER, soRequest);
  yield takeLeading(getSOView.TRIGGER, soViewReq);
  yield takeLeading(createDO.TRIGGER, createDOReq);
  yield takeLeading(soStatusAction.TRIGGER, soStatusActionReq);
}
