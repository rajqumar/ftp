
import { takeLatest, takeLeading, put, call } from 'redux-saga/effects';

import { getDOList, getDOView, doStatusAction, getInvoiceList, getInvoiceView, invoiceStatusAction } from './actions';
import axios from 'axios';
const api = process.env.API_URL;

export function* invoiceListReq() {
  try {
    yield put(getInvoiceList.request());
    var url = `${api}/invoice/`;
    var token = window.localStorage.getItem('ftp_token');
    var user = window.localStorage.getItem('current_user');
    if(user === 'buyer') {
      url = `${api}/invoice/?buyer=${true}/`;
    } else if(user === 'seller') {
      url = `${api}/invoice/?seller=${true}/`;
    }

    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(getInvoiceList.success(response.data.success.data));
  } catch (err) {
    yield put(getInvoiceList.failure(err));
  } finally {
    yield put(getInvoiceList.fulfill());
  }
}

export function* doRequest() {
  try {
    yield put(getInvoiceList.request());
    var url = `${api}/do/`;
    var token = window.localStorage.getItem('ftp_token');
    var user = window.localStorage.getItem('current_user');
    if(user === 'buyer') {
      url = `${api}/do/?buyer=${true}/`;
    } else if(user === 'seller') {
      url = `${api}/do/?seller=${true}/`;
    }

    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(getInvoiceList.success(response.data.success.data));
  } catch (err) {
    yield put(getDOList.failure(err));
  } finally {
    yield put(getDOList.fulfill());
  }
}

export function* doViewReq(action) {
  var do_id;
  if (action.payload && action.payload) {
    do_id = action.payload;
  }

  try {
    yield put(getDOView.request());

    var url = `${api}/do/${do_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getDOView.success(response.data.success.data));
  } catch (err) {
    yield put(getDOView.failure(err));
  } finally {
    yield put(getDOView.fulfill());
  }
}

export function* invViewReq(action) {
  var invoice_id;
  if (action.payload && action.payload) {
    invoice_id = action.payload;
  }

  try {
    yield put(getInvoiceView.request());

    var url = `${api}/invoice/${invoice_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getInvoiceView.success(response.data.success.data));
  } catch (err) {
    yield put(getInvoiceView.failure(err));
  } finally {
    yield put(getInvoiceView.fulfill());
  }
}

export function* invoiceStatusActionReq(action) {
  var values;
  var formData = new FormData();

  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(invoiceStatusAction.request());
    const url = `${base_url}/invoice/action/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    console.log('==>', values)
    formData.append('payment_receipt', values.payment_receipt);
    formData.append('id', values.id);
    formData.append('status', values.status);

    const response = yield call(() => axios.post(url, formData, headers));
      yield put(invoiceStatusAction.success(response.data.success.data));
    }
  } catch (err) {
    yield put(invoiceStatusAction.failure(err));
  } finally {
    yield put(invoiceStatusAction.fulfill());
  }
}

export function* doStatusActionReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(doStatusAction.request());
    const url = `${base_url}/do/action/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    if(values.status === undefined) {
      values['status'] = 'seller_approved',
      values['note'] = ''
    }
    const response = yield call(() => axios.post(url, values, headers));
      yield put(doStatusAction.success(response.data.success.data));
    }
  } catch (err) {
    yield put(doStatusAction.failure(err));
  } finally {
    yield put(doStatusAction.fulfill());
  }
}

export default function* doData() {
  yield takeLeading(getDOList.TRIGGER, doRequest);
  yield takeLeading(getInvoiceList.TRIGGER, invoiceListReq);
  yield takeLeading(getDOView.TRIGGER, doViewReq);
  yield takeLeading(getInvoiceView.TRIGGER, invViewReq);
  yield takeLeading(doStatusAction.TRIGGER, doStatusActionReq);
  yield takeLeading(invoiceStatusAction.TRIGGER, invoiceStatusActionReq);  
}
