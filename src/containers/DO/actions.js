import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

import { GET_DO_LIST, GET_DO_VIEW, DO_STATUS_ACTION } from './constants';

export const getDOList = createRoutine(GET_DO_LIST);
export const getDOView = createRoutine(GET_DO_VIEW);
export const doStatusAction = createRoutine(DO_STATUS_ACTION);
export const doStatusActionHandler = bindRoutineToReduxForm(doStatusAction)
