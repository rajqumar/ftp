import produce from 'immer';

import { getPOList, getPOView, createSO, poStatusAction } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  po_list: [],
  po_view: [],
  create_so: [],
  po_status: []
};

const poReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getPOList.REQUEST:
        draft.loading = true;
        break;

      case getPOList.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.po_list = payload;
        break;

      case getPOList.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.po_list = payload;
        break;

        case poStatusAction.REQUEST:
          draft.loading = true;
          break;
  
        case poStatusAction.SUCCESS:
          draft.loading = false;
          draft.fetched = true;
          draft.po_status = payload;
          break;
  
        case poStatusAction.FAILURE:
          draft.loading = false;
          draft.fetched = false;
          draft.po_status = payload;
          break;

      case getPOView.REQUEST:
        draft.loading = true;
        break;

      case getPOView.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.po_view = payload;
        break;

      case getPOView.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.po_view = payload;
        break;

      case createSO.REQUEST:
        draft.loading = true;
        break;

      case createSO.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.create_so = payload;
        break;

      case createSO.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.create_so = payload;
        break;
    }
  });

export default poReducer;
