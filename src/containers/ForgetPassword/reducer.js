import { forgetPassword } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  forgetPasswordata: {},
};

function forgetPasswordReducer(state = initialState, { type, payload }) {
  switch (type) {
    case forgetPassword.REQUEST:
      return { ...state, loading: true };

    case forgetPassword.SUCCESS:
      return { ...state, loading: false, fetched: true, forgetPasswordata: payload };

    case forgetPassword.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };

    default:
      return state;
  }
}

export default forgetPasswordReducer;
