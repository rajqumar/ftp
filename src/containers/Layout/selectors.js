import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectLoginToken = state => state.token || initialState;

const loginToken = () => createSelector(selectLoginToken, subState => subState);

export { loginToken, selectLoginToken };
