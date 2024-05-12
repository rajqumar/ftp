import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';
import { FETCH_PRODUCT, FETCH_SEARCH_FILTERS, FETCH_SELECTED_SUPPLIER_DATA } from './constants';

export const getProductData = createRoutine(FETCH_PRODUCT);
export const getSearchFilters = createRoutine(FETCH_SEARCH_FILTERS);
export const getSelectedSearchFilterData = createRoutine(FETCH_SELECTED_SUPPLIER_DATA);
export const seachFilterFormHandler = bindRoutineToReduxForm(getSearchFilters);
