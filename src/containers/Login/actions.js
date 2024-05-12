import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';
import { LOGIN_USER } from './constants';
export const loginUser = createRoutine(LOGIN_USER);
export const submitFormHandler = bindRoutineToReduxForm(loginUser);
