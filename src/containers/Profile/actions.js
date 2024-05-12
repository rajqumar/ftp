import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';

import { FETCH_PROFILE } from './constants';
export const getProfileData = createRoutine(FETCH_PROFILE);

export const updateProfileHandler = bindRoutineToReduxForm(getProfileData);
