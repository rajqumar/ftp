import { getDashboardData } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  data: {},
};

function dashboardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case getDashboardData.REQUEST:
      return { ...state, loading: true };

    case getDashboardData.SUCCESS:
      return { ...state, loading: false, fetched: true, data: payload };

    case getDashboardData.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };

    default:
      return state;
  }
}

export default dashboardReducer;
