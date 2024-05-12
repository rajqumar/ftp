import { createRoutine } from 'redux-saga-routines';
import { CURRENT_USER_ROLE } from './constants';
export const currentUserRole = createRoutine(CURRENT_USER_ROLE, value => value);
