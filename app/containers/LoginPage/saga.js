import { call, put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginError,
  LOGIN_SUCCESS,
} from './actions';

function* loginRequest(payload) {
  try {
    const { email, password } = payload;
    const data = yield call(() => {
      const url = '/api/auth/login';
      return fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(res => res.json())
        .then(res => res.token);
    });
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* redirect(path) {
  yield put(push(path));
}

export default function* root() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginRequest),
    takeLatest(LOGIN_SUCCESS, redirect, '/menu'),
  ]);
}
