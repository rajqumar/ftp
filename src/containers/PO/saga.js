import { takeLatest, takeLeading, put, call } from 'redux-saga/effects';

import { getPOList, getPOView, createSO, poStatusAction } from './actions';
import axios from 'axios';
const api = process.env.API_URL;

export function* poListReq() {
  try {
    yield put(getPOList.request());
    var url = `${api}/po/`;
    var user = window.localStorage.getItem('current_user');
    if(user === 'buyer') {
      url = `${api}/po/?buyer=${true}/`;
    } else if(user === 'seller') {
      url = `${api}/po/?seller=${true}/`;
    }

    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = yield call(() => axios.get(url, headers));
    yield put(getPOList.success(response.data.success.data));
  } catch (err) {
    yield put(getPOList.failure(err));
  } finally {
    yield put(getPOList.fulfill());
  }
}

export function* poViewReq(action) {
  var po_id;
  if (action.payload && action.payload) {
    po_id = action.payload;
  }

  try {
    yield put(getPOView.request());

    var url = `${api}/po/${po_id}`;
    var token = window.localStorage.getItem('ftp_token');
    var headers = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = yield call(() => axios.get(url, headers));
    yield put(getPOView.success(response.data.success.data));
  } catch (err) {
    yield put(getPOView.failure(err));
  } finally {
    yield put(getPOView.fulfill());
  }
}

export function* createSOReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(createSO.request());
    const url = `${base_url}/so/`;

    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      const headers = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      var pr = []
      values.products.map(pd => 
        Object.keys(values).map(k => {
          
          if(k.includes(pd.id)) {
            var ship_date_key = `ship_date_${pd.id}`
            var ship_date = values[ship_date_key]
            pr.push({
              product: pd.id,
              ship_date: ship_date
            })
          }
        })  
      )

      values.product_shipment = pr

      const response = yield call(() => axios.post(url, values, headers));
      yield put(createSO.success(response.data.success.data));
    }
  } catch (err) {
    yield put(createSO.failure(err));
  } finally {
    yield put(createSO.fulfill());
  }
}


export function* poStatusActionReq(action) {
  var values;
  if (action.payload && action.payload.values) {
    values = action.payload.values;
  }

  const base_url = process.env.API_URL;

  try {
    yield put(poStatusAction.request());
    const url = `${base_url}/po/action/`;

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
      yield put(poStatusAction.success(response.data.success.data));
    }
  } catch (err) {
    yield put(poStatusAction.failure(err));
  } finally {
    yield put(poStatusAction.fulfill());
  }
}

export default function* poData() {
  yield takeLeading(getPOList.TRIGGER, poListReq);
  yield takeLeading(getPOView.TRIGGER, poViewReq);
  yield takeLeading(createSO.TRIGGER, createSOReq);
  yield takeLeading(poStatusAction.TRIGGER, poStatusActionReq);

}
