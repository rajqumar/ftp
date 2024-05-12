import produce from 'immer';

import {
  getRFQList,
  createRFQ,
  createQuotation,
  getRFQInitialData,
  getSuppliers,
  getRFQFromID,
  sellerRFQList,
  getSellerRFQFromID,
  rfqStatusAction
} from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  data: [],
  seller_data: [],
  create_quotes: [],
  initial_data: {},
  suppliers: {},
  rfq_status_action: []
};

const rfqReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getRFQList.REQUEST:
        draft.loading = true;

        break;

      case getRFQList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.data = payload;

        break;

      case getRFQList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.data = payload;

        break;

        case rfqStatusAction.REQUEST:
          draft.loading = true;
  
          break;
  
        case rfqStatusAction.SUCCESS:
          draft.loading = false;
          draft.fetched = true;
          draft.rfq_status_action = payload;
  
          break;
  
        case rfqStatusAction.FAILURE:
          draft.loading = false;
          draft.fetched = false;
          draft.rfq_status_action = payload;
  
          break;

      case createQuotation.REQUEST:
        draft.loading = true;

        break;

      case createQuotation.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.create_quotation = payload;

        break;

      case createQuotation.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.create_quotation = payload;

        break;

      case getSellerRFQFromID.REQUEST:
        draft.loading = true;

        break;

      case getSellerRFQFromID.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.seller_rfq_data = payload;

        break;

      case getSellerRFQFromID.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.seller_rfq_data = payload;

        break;

      case sellerRFQList.REQUEST:
        draft.loading = true;

        break;

      case sellerRFQList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.seller_data = payload;

        break;

      case sellerRFQList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.seller_data = payload;

        break;

      case getSuppliers.REQUEST:
        draft.loading = true;

        break;

      case getSuppliers.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.suppliers = payload;

        break;

      case getSuppliers.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.suppliers = payload;

        break;

      case getRFQFromID.REQUEST:
        draft.loading = true;

        break;

      case getRFQFromID.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.rfq_data = payload;

        break;

      case getRFQFromID.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.rfq_data = payload;

        break;

      case getRFQInitialData.REQUEST:
        draft.loading = true;

        break;

      case getRFQInitialData.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.initial_data = payload;

        break;

      case getRFQInitialData.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.initial_data = payload;

        break;

      case createRFQ.REQUEST:
        draft.loading = true;
        break;

      case createRFQ.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.create_quotes = payload;

        break;

      case createRFQ.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.create_quotes = payload;

        break;
    }
  });

export default rfqReducer;
