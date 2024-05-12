import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { getProductData, getSearchFilters, getSelectedSearchFilterData } from './actions';
import axios from 'axios';

export function* searchRequest(action) {
  const { payload } = action;
  const base_url = process.env.API_URL;

  try {
    yield put(getProductData.request());
    let product_search_url;

    if (payload) {
      product_search_url = `${base_url}/products/?search=${payload}`;
    } else {
      product_search_url = `${base_url}/products/?search=n`;
    }

    const productSearchrResponse = yield call(() => axios.get(product_search_url));

    if (productSearchrResponse.status == 200) {
      let result;

      if (payload) {
        result = {
          search_result: productSearchrResponse.data.success.data.search_result,
          category_count_list: productSearchrResponse.data.success.data.category_count_list,
        };
      } else {
        result = {
          all_search_result: productSearchrResponse.data.success.data.search_result,
        };
      }

      yield put(getProductData.success(result));
    }
  } catch (err) {
    yield put(getProductData.failure(err));
  } finally {
    yield put(getProductData.fulfill());
  }
}

export function* searchFiltersRequest() {
  const base_url = process.env.API_URL;

  try {
    yield put(getSearchFilters.request());

    const search_filter_url = `${base_url}/search-filters/`;
    const searchFilterResponse = yield call(() => axios.get(search_filter_url));

    if (searchFilterResponse.status == 200) {
      yield put(getSearchFilters.success(searchFilterResponse.data.success.data));
    }
  } catch (err) {
    yield put(getSearchFilters.failure(err));
  } finally {
    yield put(getSearchFilters.fulfill());
  }
}

export function* selectedSearchFilterDataRequest(action) {
  const {
    payload: { name, value },
  } = action;
  const base_url = process.env.API_URL;

  try {
    yield put(getSelectedSearchFilterData.request());
    let selected_Search_filter_url;
    if (name == 'Manufacturer') {
      selected_Search_filter_url = `${base_url}/products/?search=n&manufacturer=${value}`;
    }

    if (name == 'Supplier') {
      selected_Search_filter_url = `${base_url}/products/?search=n&seller=${value}`;
    }

    if (name == 'Country') {
      selected_Search_filter_url = `${base_url}/products/?search=n&country=${value}`;
    }

    if (name == 'CarouselCategory') {
      selected_Search_filter_url = `${base_url}/products/?search=n&category=${value}`;
    }

    const selectedSearchFilterResponse = yield call(() => axios.get(selected_Search_filter_url));
    if (selectedSearchFilterResponse.status == 200) {
      if (name == 'CarouselCategory') {
        const carouselCategoryMetadata = {
          carousal_search_result: selectedSearchFilterResponse.data.success.data,
        };
        yield put(getSelectedSearchFilterData.success(carouselCategoryMetadata));
      } else {
        yield put(getSelectedSearchFilterData.success(selectedSearchFilterResponse.data.success.data));
      }
    }
  } catch (err) {
    yield put(getSelectedSearchFilterData.failure(err));
  } finally {
    yield put(getSelectedSearchFilterData.fulfill());
  }
}

export default function* searchData() {
  yield takeEvery(getProductData.TRIGGER, searchRequest);
  yield takeLatest(getSearchFilters.TRIGGER, searchFiltersRequest);
  yield takeLatest(getSelectedSearchFilterData.TRIGGER, selectedSearchFilterDataRequest);
}
