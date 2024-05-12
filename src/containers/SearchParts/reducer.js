import { getProductData, getSearchFilters, getSelectedSearchFilterData } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  searchedProductDetail: {},
  allSearchedProductDetail: {},
  searchFilters: {},
  supplierData: {},
};

function searchReducer(state = initialState, { type, payload }) {
  switch (type) {
    case getProductData.REQUEST:
      return { ...state, loading: true };

    case getProductData.SUCCESS:
      if (payload.search_result) {
        return { ...state, loading: false, fetched: true, searchedProductDetail: payload };
      }

      return { ...state, loading: false, fetched: true, allSearchedProductDetail: payload };

    case getProductData.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };

    case getSearchFilters.REQUEST:
      return { ...state, loading: true };

    case getSearchFilters.SUCCESS:
      return { ...state, loading: false, fetched: true, searchFilters: payload };

    case getSearchFilters.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };

    case getSelectedSearchFilterData.REQUEST:
      return { ...state, loading: true };

    case getSelectedSearchFilterData.SUCCESS:
      return { ...state, loading: false, fetched: true, supplierData: payload };

    case getSelectedSearchFilterData.FAILURE:
      return { ...state, loading: false, fetched: false, error: payload };
    default:
      return state;
  }
}

export default searchReducer;
