import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';
import { CREATE_USER, FETCH_USER_ROLES, FETCH_USER_LIST, USER_ACTIVE_DEACTIVE } from './constants';

export const createUser = createRoutine(CREATE_USER);
export const getUserRoles = createRoutine(FETCH_USER_ROLES);
export const getUsersList = createRoutine(FETCH_USER_LIST);
export const makeUserActiveDeactive = createRoutine(USER_ACTIVE_DEACTIVE);
export const createUsersHandler = bindRoutineToReduxForm(createUser);
