import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

import {
  GET_RFQ_LIST,
  CREATE_RFQ,
  GET_RFQ_INITIAL_DATA,
  GET_SUPPLIERS,
  GET_RFQ_FROM_ID,
  GET_SELLER_RFQ_LIST,
  GET_SELLER_RFQ_FROM_ID,
  CREATE_QUOTATION,
  RFQ_STATUS_ACTION
} from './constants';

export const getRFQList = createRoutine(GET_RFQ_LIST);
export const sellerRFQList = createRoutine(GET_SELLER_RFQ_LIST);
export const getSellerRFQFromID = createRoutine(GET_SELLER_RFQ_FROM_ID);

export const createRFQ = createRoutine(CREATE_RFQ);
export const createQuotation = createRoutine(CREATE_QUOTATION);
export const getSuppliers = createRoutine(GET_SUPPLIERS);

export const getRFQInitialData = createRoutine(GET_RFQ_INITIAL_DATA);

export const getRFQFromID = createRoutine(GET_RFQ_FROM_ID);

export const createRFQHandler = bindRoutineToReduxForm(createRFQ);

export const rfqStatusAction = createRoutine(RFQ_STATUS_ACTION)
export const rfqStatusActionHandler = bindRoutineToReduxForm(rfqStatusAction)

export const createQuotationSeller = bindRoutineToReduxForm(createQuotation);
