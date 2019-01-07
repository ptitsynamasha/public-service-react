import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { makeSelectToken } from 'containers/App/selectors';
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginError,
  LOGIN_SUCCESS,
} from './actions';
import {
  waterServiceMetersError,
  waterServiceMetersSuccess,
  waterServiceMetersPriceSuccess,
  waterServiceMetersPriceError,
  waterServiceSuccess,
  waterServiceError,
} from '../store/actions/waterService';

function* loginRequest(payload) {
  try {
    const { username, password } = payload;
    const response = yield call(() => {
      const url = '/api/auth/login';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
    });
    const data = yield response.json();
    if (response.status >= 200 && response.status < 300) {
      yield put(loginSuccess(data));
    } else {
      yield put(loginError(response.status, data));
    }
  } catch (error) {
    yield put(loginError(500, error));
  }
}

function* redirect(path) {
  yield put(push(path));
}

function* waterServiceMetersRequest(loginSuccessData) {
  try {
    const token = loginSuccessData.token;
    const response = yield call(() => {
      const url = '/api/water-service-meters';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    });
    const data = yield response.json();
    if (response.status >= 200 && response.status < 300) {
      yield put(waterServiceMetersSuccess(data));
    } else {
      yield put(waterServiceMetersError(response.status, data));
    }
  } catch (error) {
    yield put(waterServiceMetersError(500, error));
  }
}

function* waterServiceMetersPriceRequest(loginSuccessData) {
  try {
    const token = loginSuccessData.token;
    const response = yield call(() => {
      const url = '/api/price';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ serviceName: 'WaterService' }),
      });
    });
    const data = yield response.json();
    if (response.status >= 200 && response.status < 300) {
      yield put(waterServiceMetersPriceSuccess(data));
    } else {
      yield put(waterServiceMetersPriceError(response.status, data));
    }
  } catch (error) {
    yield put(waterServiceMetersPriceError(500, error));
  }
}

function* waterServiceRequest(loginSuccessData) {
  try {
    const token = loginSuccessData.token;
    const response = yield call(() => {
      const url = '/api/water-service';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    });
    const data = yield response.json();
    if (response.status >= 200 && response.status < 300) {
      yield put(waterServiceSuccess(data));
    } else {
      yield put(waterServiceError(response.status, data));
    }
  } catch (error) {
    yield put(waterServiceError(500, error));
  }
}

export default function* root() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginRequest),
    takeLatest(LOGIN_SUCCESS, waterServiceMetersRequest),
    takeLatest(LOGIN_SUCCESS, waterServiceMetersPriceRequest),
    takeLatest(LOGIN_SUCCESS, waterServiceRequest),
    takeLatest(LOGIN_SUCCESS, redirect, '/menu'),
  ]);
}
