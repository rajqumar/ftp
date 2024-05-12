import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';
import { FORGET_PASSWORD } from './constants';
export const forgetPassword = createRoutine(FORGET_PASSWORD);
export const submitFormHandler = bindRoutineToReduxForm(forgetPassword);