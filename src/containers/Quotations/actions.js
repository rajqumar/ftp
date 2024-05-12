import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

import {
  CREATE_QUOTATION,
  CREATE_PO,
  GET_QUOTATIONS_LIST,
  GET_QUOTATION_DETAILS,
  QUOTATION_STATUS_ACTION,
} from './constants';

export const getQuotationsList = createRoutine(GET_QUOTATIONS_LIST);
export const getQuotationDetails = createRoutine(GET_QUOTATION_DETAILS);

export const createPO = createRoutine(CREATE_PO);
export const createQuotation = createRoutine(CREATE_QUOTATION);

export const createPOHandler = bindRoutineToReduxForm(createPO);
export const createQuotationSeller = bindRoutineToReduxForm(createQuotation);

export const quotationStatusAction = createRoutine(QUOTATION_STATUS_ACTION)
export const quotationStatusActionHandler = bindRoutineToReduxForm(quotationStatusAction)
