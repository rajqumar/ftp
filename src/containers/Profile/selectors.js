import { createSelector } from 'reselect';

import { initialState } from './reducer';

const staticProfileData = () => ({
  company: {
    name: 'Acme Inc',
    phone: '0870970707',
    uen: 'AD898998',
    email: 'john@wick.com',
    country: 'India',
    addr1: 'Mangatram',
    addr2: 'Mumbai78',
  },
  user: {
    name: 'Wick',
    email: 'john@wick.com',
    title: 'contractor',
    phone: '9898982900',
  },
});

const selectProfileData = state => (state && state.profile ? state.profile : staticProfileData || initialState);

const profileData = () => createSelector(selectProfileData, subState => subState);

export { profileData, selectProfileData };
