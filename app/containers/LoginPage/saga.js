import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { makeSelectToken } from 'containers/App/selectors';

import {
  LOGIN_REQUEST,
  loginSuccess,
  loginError,
  LOGIN_SUCCESS,
} from './actions';
import { WATER_SERVICE_METERS_REQUEST, waterServiceMetersError, waterServiceMetersSuccess } from '../MenuPage/actions';

function* loginRequest(payload) {
  try {
    const { username, password } = payload;
    const data = yield call(() => {
      const url = '/api/auth/login';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(res => res.json())
        .then(res => res.token);
    });
    yield put(loginSuccess(data));
    yield waterServiceMetersRequest();
  } catch (error) {
    yield put(loginError(error));
  }
}

function* redirect(path) {
  yield put(push(path));
}

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
  yield all([
    takeLatest(LOGIN_REQUEST, loginRequest),
    takeLatest(LOGIN_SUCCESS, redirect, '/menu'),
  ]);
}
