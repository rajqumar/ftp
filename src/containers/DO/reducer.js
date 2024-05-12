import produce from 'immer';

import { getDOList, getDOView, doStatusAction } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  do_list: [],
  do_view: [],
  do_status: []
};

const doReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getDOList.REQUEST:
        draft.loading = true;
        break;

      case getDOList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.do_list = payload;
        break;

      case getDOList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.do_list = payload;
        break;


        case doStatusAction.REQUEST:
          draft.loading = true;
          break;
  
        case doStatusAction.SUCCESS:
          draft.loading = false;
          draft.fetched = true;
          draft.do_status = payload;
          break;
  
        case doStatusAction.FAILURE:
          draft.loading = false;
          draft.fetched = false;
          draft.do_status = payload;
          break;
  
      case getDOView.REQUEST:
        draft.loading = true;
        break;

      case getDOView.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.do_view = payload;
        break;

      case getDOView.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.do_view = payload;
        break;
    }
  });

export default doReducer;
