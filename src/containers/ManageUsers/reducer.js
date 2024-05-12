import produce from 'immer';

import { createUser, getUserRoles, getUsersList, makeUserActiveDeactive } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  data: [],
  roles: [],
  users: {},
  userActiveDeactive: [],
};

const manageUsersReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case createUser.REQUEST:
        draft.loading = true;

        break;

      case createUser.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.data = payload;

        break;

      case createUser.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.data = payload;

        break;

      case getUserRoles.REQUEST:
        draft.loading = true;

        break;

      case getUserRoles.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.roles = payload;

        break;

      case getUserRoles.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;

      case getUsersList.REQUEST:
        draft.loading = true;

        break;

      case getUsersList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.users = payload;

        break;

      case getUsersList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;

      case makeUserActiveDeactive.REQUEST:
        draft.loading = true;

        break;

      case makeUserActiveDeactive.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.userActiveDeactive = payload;

        break;

      case makeUserActiveDeactive.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;
    }
  });

export default manageUsersReducer;
