import { toast } from '../../utils/materialize';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginSuccess({ token }) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

export function loginError(status, error) {
  toast(status, error.message);
  return {
    type: LOGIN_ERROR,
    error,
  };
}
