import { takeLatest, takeLeading, put, call } from 'redux-saga/effects';

import {
  quotationStatusAction,
  createQuotation,
  getQuotationsList,
  getQuotationDetails,
  createPO,
} from './actions';
import axios from 'axios';
const api = process.env.API_URL;

export function* quotationsReq() {
  try {
    yield put(getQuotationsList.request());
    var token = window.localStorage.getItem('ftp_token');
    var user = window.localStorage.getItem('current_user');

    var url = `${api}/quotations/`;
    if(user === 'buyer') {
      url = `${api}/quotations/?buyer=${true}/`;
    } else if(user === 'seller') {
      url = `${api}/quotations/?seller=${true}/`;
    }

    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(getQuotationsList.success(response.data.success.data));
  } catch (err) {
    yield put(getQuotationsList.failure(err));
  } finally {
    yield put(getQuotationsList.fulfill());
  }
}

export function* quotationDetailsReq(action) {
  var qt_id;
  if (action.payload && action.payload) {
    qt_id = action.payload;
  }

  try {
    yield put(getQuotationDetails.request());

    var url = `${api}/quotations/${qt_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getQuotationDetails.success(response.data.success.data));
  } catch (err) {
    yield put(getQuotationDetails.failure(err));
  } finally {
    yield put(getQuotationDetails.fulfill());
  }
}

export function* createSellerQuotationReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(createQuotation.request());
    const url = `${base_url}/quotations/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      var products = [];
      var terms = [];

      Object.keys(values).map(k => {
        if (k.includes('lead')) {
          var key = parseInt(Object.keys(k)[0]) + 1;
          var lead_time = `lead_time_${key}`;
          var quantity = values[`quantity_${key}`].split('-');
          var qty_to = quantity[1];
          var qty_from = quantity[0];
          var unit_price = `unit_price_${key}`;
          var moq = `moq_${key}`;
          var remark = `remark_${key}`;
          products.push({
            lead_time: values[lead_time],
            qty_to: qty_to,
            qty_from: qty_from,
            unit_price: values[unit_price],
            moq: values[moq],
            remark: values[remark],
          });
        }
      });
      var product = values.product_id;

      values.products = [{ [product]: products }];
      const response = yield call(() => axios.post(url, values, headers));

      yield put(createQuotation.success(response.data.success.data));
    }
  } catch (err) {
    yield put(createQuotation.failure(err));
  } finally {
    yield put(createQuotation.fulfill());
  }
}

export function* createPORequest(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(createPO.request());
    const url = `${base_url}/po/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      var pr = []

      values.inproducts.map(pd => 
        Object.keys(values).map(k => {
          if(k.includes(pd.part_number)) {
            var qty_key = `quantity_${pd.part_number}`
            var qty_val = values[qty_key].trim()
            // console.log('pr', qty_val)

            pd.details.map(p => {
              if(qty_val < p.qty_from && qty_val > p.qty_to) {
                pr.push({
                  product: p.id,
                  qty: qty_val
                })
              }
            })
          }
        })
        )
        // console.log('SAGA VALUES => ', pr)
      // return

      // pr = pr.filter((thing, index, self) =>
      //   index === self.findIndex((t) => (
      //     t.product === thing.product && t.qty === thing.qty
      //   ))
      // )

      values['products'] = pr
// return
      const response = yield call(() => axios.post(url, values, headers));

      yield put(createPO.success(response.data.success.data));
    }
  } catch (err) {
    yield put(createPO.failure(err));
  } finally {
    yield put(createPO.fulfill());
  }
}

export function* quotationStatusActionReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(quotationStatusAction.request());
    const url = `${base_url}/quotations/action/`;

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
      yield put(quotationStatusAction.success(response.data.success.data));
    }
  } catch (err) {
    yield put(quotationStatusAction.failure(err));
  } finally {
    yield put(quotationStatusAction.fulfill());
  }
}

export default function* rfqData() {
  yield takeLeading(createPO.TRIGGER, createPORequest);
  yield takeLeading(createQuotation.TRIGGER, createSellerQuotationReq);
  yield takeLatest(getQuotationsList.TRIGGER, quotationsReq);
  yield takeLatest(getQuotationDetails.TRIGGER, quotationDetailsReq);
  yield takeLeading(quotationStatusAction.TRIGGER, quotationStatusActionReq);
}
