import { takeLatest, takeLeading, put, call } from 'redux-saga/effects';

import {
  getRFQList,
  getRFQInitialData,
  createRFQ,
  createQuotation,
  getSuppliers,
  getRFQFromID,
  sellerRFQList,
  getSellerRFQFromID,
  rfqStatusAction
} from './actions';
import axios from 'axios';
import Router from 'next/router';

const api = process.env.API_URL;

export function* rfqRequest() {
  try {
    yield put(getRFQList.request());
    var url
    var token = window.localStorage.getItem('ftp_token');
    var user = window.localStorage.getItem('current_user');
    if(user === 'buyer') {
      url = `${api}/rfq/?buyer=${true}`;
    } else if(user === 'seller') {
      url = `${api}/seller-rfq/`;
    }
 
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(getRFQList.success(response.data.success.data));
  } catch (err) {
    yield put(getRFQList.failure(err));
  } finally {
    yield put(getRFQList.fulfill());
  }
}

export function* sellerRFQRequest() {
  try {
    yield put(sellerRFQList.request());
    var url = `${api}/seller-rfq/`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(sellerRFQList.success(response.data.success.data));
  } catch (err) {
    yield put(sellerRFQList.failure(err));
  } finally {
    yield put(sellerRFQList.fulfill());
  }
}
export function* rfqSellerFromIdRequest(action) {
  var rfq_id;
  if (action.payload && action.payload) {
    rfq_id = action.payload;
  }

  try {
    yield put(getSellerRFQFromID.request());

    var url = `${api}/rfq/${rfq_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getSellerRFQFromID.success(response.data.success.data));
  } catch (err) {
    yield put(getSellerRFQFromID.failure(err));
  } finally {
    yield put(getSellerRFQFromID.fulfill());
  }
}

export function* rfqFromIdRequest(action) {
  var rfq_id;
  if (action.payload && action.payload) {
    rfq_id = action.payload;
  }

  try {
    yield put(getRFQFromID.request());

    var url = `${api}/rfq/${rfq_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getRFQFromID.success(response.data.success.data));
  } catch (err) {
    yield put(getRFQFromID.failure(err));
  } finally {
    yield put(getRFQFromID.fulfill());
  }
}

export function* suppliersRequest() {
  try {
    yield put(getSuppliers.request());

    var url = `${api}/sellers/`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getSuppliers.success(response.data.success.data));
  } catch (err) {
    yield put(getSuppliers.failure(err));
  } finally {
    yield put(getSuppliers.fulfill());
  }
}

export function* initialDataRequest() {
  try {
    yield put(getRFQInitialData.request());

    var url = `${api}/rfq/initial_data/`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getRFQInitialData.success(response.data.success.data));
  } catch (err) {
    yield put(getRFQInitialData.failure(err));
  } finally {
    yield put(getRFQInitialData.fulfill());
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

      var pr = []
      values.products.map((product, i) => {
        var pr_id = product.id
        pr.push({
          [pr_id]: []
        })
      });

      pr.map(t=> {
        var id = (Object.keys(t)[0])
        var key = 0
        Object.keys(values).map(k => {
          if (k.includes(id)) {
            key++;
            var lead_time = `${id}_lead_time_${key}`;
            var preid = lead_time.split('_')[0]
            var quantity = values[`${id}_quantity_${key}`]
            quantity = quantity && quantity.length > 0 ? quantity.split('-') : [0,0];
            var qty_to = quantity && quantity[0] ? quantity[0] : 0;
            var qty_from = quantity && quantity[1] ? quantity[1] : 0;
            var unit_price = `${id}_unit_price_${key}`;
            var moq = `${id}_moq_${key}`;
            var remark = `${id}_remark_${key}`;

            if(preid === id && values[lead_time] && values[moq] && values[remark] && values[unit_price]) {
              Object.values(t)[0].push({
                  lead_time: values[lead_time],
                  qty_to: qty_to,
                  qty_from: qty_from,
                  unit_price: values[unit_price],
                  moq: values[moq],
                  remark: values[remark],
              })
              
            }
          }
        });
      }
      )


      values.products = pr;
      const response = yield call(() => axios.post(url, values, headers));
      yield put(createQuotation.success(response.data.success.data));
    }
  } catch (err) {
    yield put(createQuotation.failure(err));
  } finally {
    yield put(createQuotation.fulfill());
  }
}

export function* rfqStatusActionReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;
console.log('sdnasndlkjlks', values)

  try {
    yield put(rfqStatusAction.request());
    const url = `${base_url}/rfq/action/`;

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
      yield put(rfqStatusAction.success(response.data.success.data));
    }
  } catch (err) {
    yield put(rfqStatusAction.failure(err));
  } finally {
    yield put(rfqStatusAction.fulfill());
  }
}

export function* createRFQRequest(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(createRFQ.request());
    const url = `${base_url}/rfq/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    var products = []
    var seller = []
    var terms = []
    if (Object.keys(Router.query).length > 0 && Router.query.part_id) {
      values.part_no_1 = Router.query.part_id;
    }
    var key = 0
    Object.keys(values).map((k, i) => {
      console.log(k)
      if(k.includes('part')) {
        key++
        
        var eta_key = `due_date`
        var is_tier_key = `is_tier_${key}`
        var qty_key = `quantity_${key}`

        products.push({product_id: values[k], is_tier: values[is_tier_key], qty: values[qty_key], eta: values[eta_key]})
        terms.push(values.conveyance, values.incoterm, values.payment_term, values.shipping)
      }
    })
    seller.push({seller_id: values.supplier_id})

    values['products'] = products
    values['seller'] = seller
    values['terms'] = terms.filter((a, b) => terms.indexOf(a) === b)

      const response = yield call(() => axios.post(url, values, headers));
      yield put(createRFQ.success(response.data.success.data));
    }
  } catch (err) {
    yield put(createRFQ.failure(err));
  } finally {
    yield put(createRFQ.fulfill());
  }
}

export default function* rfqData() {
  yield takeLeading(createRFQ.TRIGGER, createRFQRequest);
  yield takeLeading(rfqStatusAction.TRIGGER, rfqStatusActionReq);

  yield takeLeading(createQuotation.TRIGGER, createSellerQuotationReq);

  yield takeLatest(getRFQList.TRIGGER, rfqRequest);
  yield takeLatest(sellerRFQList.TRIGGER, sellerRFQRequest);
  yield takeLatest(getRFQInitialData.TRIGGER, initialDataRequest);
  yield takeLatest(getRFQFromID.TRIGGER, rfqFromIdRequest);
  yield takeLatest(getSellerRFQFromID.TRIGGER, rfqSellerFromIdRequest);

  yield takeLatest(getSuppliers.TRIGGER, suppliersRequest);
}
