import produce from 'immer';

import { getSOList, getSOView, createDO, soStatusAction } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  so_list: [],
  so_view: [],
  create_do: [],
  so_status: []
};

const soReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getSOList.REQUEST:
        draft.loading = true;
        break;

      case getSOList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.so_list = payload;
        break;

      case getSOList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.so_list = payload;
        break;

    
        case soStatusAction.REQUEST:
          draft.loading = true;
          break;
  
        case soStatusAction.SUCCESS:
          draft.loading = false;
          draft.fetched = true;
          draft.so_status = payload;
          break;
  
        case soStatusAction.FAILURE:
          draft.loading = false;
          draft.fetched = false;
          draft.so_status = payload;
          break;

      case getSOView.REQUEST:
        draft.loading = true;
        break;

      case getSOView.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.so_view = payload;
        break;

      case getSOView.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.so_view = payload;
        break;

      case createDO.REQUEST:
        draft.loading = true;
        break;

      case createDO.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.create_do = payload;
        break;

      case createDO.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.create_do = payload;
        break;
    }
  });

export default soReducer;
