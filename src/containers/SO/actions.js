import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

import { GET_SO_LIST, GET_SO_VIEW, CREATE_DO, SO_STATUS_ACTION } from './constants';

export const getSOList = createRoutine(GET_SO_LIST);
export const getSOView = createRoutine(GET_SO_VIEW);
export const createDO = createRoutine(CREATE_DO);
export const createDOHandler = bindRoutineToReduxForm(createDO);

export const soStatusAction = createRoutine(SO_STATUS_ACTION);
export const soStatusActionHandler = bindRoutineToReduxForm(soStatusAction);
