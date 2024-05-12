import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

import { GET_PO_LIST, GET_PO_VIEW, CREATE_SO, PO_STATUS_ACTION } from './constants';

export const getPOList = createRoutine(GET_PO_LIST);
export const getPOView = createRoutine(GET_PO_VIEW);
export const createSO = createRoutine(CREATE_SO);
export const poStatusAction = createRoutine(PO_STATUS_ACTION);

export const poStatusActionHandler = bindRoutineToReduxForm(poStatusAction);
export const createSOHandler = bindRoutineToReduxForm(createSO);
