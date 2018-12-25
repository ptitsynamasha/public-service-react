import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  WATER_SERVICE_METERS_REQUEST,
  waterServiceMetersSuccess,
  waterServiceMetersError,
} from './actions';
import { makeSelectToken } from 'containers/App/selectors';

function* waterServiceMetersRequest() {
  try {
    // TODO chatId from telegram
    const chatId = '280601079';
    const token = yield select(makeSelectToken());

    const data = yield call(() => {
      const url = '/api/water-service-meters';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ chatId }),
      })
        .then(res => res.json());
    });
    yield put(waterServiceMetersSuccess(data));
  } catch (error) {
    yield put(waterServiceMetersError(error));
  }
}

export default function* root() {
  yield takeLatest(WATER_SERVICE_METERS_REQUEST, waterServiceMetersRequest);
}
