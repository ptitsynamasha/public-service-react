import { fromJS } from 'immutable';

import { LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS } from './actions';

export const initialState = fromJS({
  token: null,
  loading: false,
  error: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('loading', true)
        .set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('token', action.token);
    case LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('token', false)
        .set('loading', false);
    default:
      return state;
  }
}

export default loginReducer;
