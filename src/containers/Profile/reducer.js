import produce from 'immer';

import { getProfileData } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  data: [],
};

const profileReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getProfileData.REQUEST:
        draft.loading = true;

        break;

      case getProfileData.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.data = payload;

        break;

      case getProfileData.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.data = payload;

        break;
    }
  });

export default profileReducer;
