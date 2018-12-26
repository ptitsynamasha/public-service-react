import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { makeSelectToken } from 'containers/App/selectors';

import {
  WATER_SERVICE_METER_EDIT_REQUEST,
  waterServiceMeterEditSuccess,
  waterServiceMeterEditError,
} from './actions';

function* waterServiceMetersRequest(payload) {
  try {
    const { key, value } = payload;
    const token = yield select(makeSelectToken());

    const data = yield call(() => {
      const url = '/api/water-service-meters';
      return fetch(url, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ key, value }),
      })
        .then(res => res.json());
    });
    yield put(waterServiceMeterEditSuccess(data));
  } catch (error) {
    yield put(waterServiceMeterEditError(error));
  }
}

export default function* root() {
  yield all([
    takeLatest(WATER_SERVICE_METER_EDIT_REQUEST, waterServiceMetersRequest),
  ]);
}
