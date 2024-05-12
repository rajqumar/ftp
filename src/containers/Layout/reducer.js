import { currentUserRole } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  role: 'admin',
};

function currentUserRoleReducer(state = initialState, { type, payload }) {
  switch (type) {
    case currentUserRole.REQUEST:
      return { ...state, loading: true };

    case currentUserRole.SUCCESS:
      return { ...state, loading: false, fetched: true, role: payload };

    case currentUserRole.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };

    default:
      return state;
  }
}

export default currentUserRoleReducer;
