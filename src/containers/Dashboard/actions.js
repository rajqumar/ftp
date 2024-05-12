import { createRoutine } from 'redux-saga-routines';
import { FETCH_DASHBOARD } from './constants';

export const getDashboardData = createRoutine(FETCH_DASHBOARD);