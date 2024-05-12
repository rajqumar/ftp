import { loginUser } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  loginData: [],
};

function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case loginUser.REQUEST:
      return { ...state, loading: true };

    case loginUser.SUCCESS:
      return { ...state, loading: false, fetched: true, loginData: payload };

    case loginUser.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };

    default:
      return state;
  }
}

export default loginReducer;
