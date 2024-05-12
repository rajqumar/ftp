import produce from 'immer';

import { quotationStatusAction, createQuotation, getQuotationsList, getQuotationDetails, createPO } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  data: [],
  seller_data: [],
  create_quotation: [],
  initial_data: [],
  quotations_list: [],
  quotation_details: [],
  po_response: [],
  quotation_status: []
};

const rfqReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
        case quotationStatusAction.REQUEST:
          draft.loading = true;
          break;
  
        case quotationStatusAction.SUCCESS:
          draft.loading = false;
          draft.fetched = true;
          draft.quotation_status = payload;
          break;
  
        case quotationStatusAction.FAILURE:
          draft.loading = false;
          draft.fetched = false;
          draft.quotation_status = payload;
          break;

      case createPO.REQUEST:
        draft.loading = true;
        break;

      case createPO.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.po_response = payload;
        break;

      case createPO.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.po_response = payload;
        break;

      case getQuotationDetails.REQUEST:
        draft.loading = true;
        break;

      case getQuotationDetails.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.quotation_details = payload;
        break;

      case getQuotationDetails.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.quotation_details = payload;
        break;

      case getQuotationsList.REQUEST:
        draft.loading = true;
        break;

      case getQuotationsList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.quotations_list = payload;
        break;

      case getQuotationsList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.quotations_list = payload;
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
    }
  });

export default rfqReducer;
