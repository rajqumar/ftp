import { takeLatest, put, call } from 'redux-saga/effects';

import { currentUserRole } from './actions';

export function* currentUserRoleRequest(action) {
  try {
    yield put(currentUserRole.request());

    var value = action.payload;

    yield put(currentUserRole.success(value));
  } catch (err) {
    yield put(currentUserRole.failure(err));
  } finally {
    yield put(currentUserRole.fulfill());
  }
}

export default function* currentUserRoles() {
  yield takeLatest(currentUserRole.TRIGGER, currentUserRoleRequest);
}
