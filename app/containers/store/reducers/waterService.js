import { fromJS } from 'immutable';

import {
  WATER_SERVICE_METERS_REQUEST,
  WATER_SERVICE_METERS_SUCCESS,
  WATER_SERVICE_METERS_ERROR,

  WATER_SERVICE_METER_EDIT_REQUEST,
  WATER_SERVICE_METER_EDIT_ERROR,
  WATER_SERVICE_METER_EDIT_SUCCESS,

  WATER_SERVICE_METERS_PRICE_REQUEST,
  WATER_SERVICE_METERS_PRICE_SUCCESS,
  WATER_SERVICE_METERS_PRICE_ERROR,

  WATER_SERVICE_REQUEST,
  WATER_SERVICE_SUCCESS,
  WATER_SERVICE_ERROR,

  WATER_SERVICE_INDICATION_ADD_REQUEST,
  WATER_SERVICE_INDICATION_ADD_SUCCESS,
  WATER_SERVICE_INDICATION_ADD_ERROR,

  WATER_SERVICE_METER_PRICE_EDIT_REQUEST,
  WATER_SERVICE_METER_PRICE_EDIT_SUCCESS,
  WATER_SERVICE_METER_PRICE_EDIT_ERROR,
} from '../actions/waterService';

export const initialState = fromJS({
  meters: null,
  price: null,
  indication: null,
  loading: false,
  error: false,
});

function waterServiceMetersReducer(state = initialState, action) {
  switch (action.type) {
    case WATER_SERVICE_METERS_REQUEST:
      return state.set('loading', true).set('error', false);
    case WATER_SERVICE_METERS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('meters', action.meters);
    case WATER_SERVICE_METERS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    /*---------------------*/
    case WATER_SERVICE_METER_EDIT_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('meters', action.meters);
    case WATER_SERVICE_METER_EDIT_REQUEST:
      return state
        .set('loading', false)
        .set('error', false);
    case WATER_SERVICE_METER_EDIT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    /*---------------------*/
    case WATER_SERVICE_METERS_PRICE_REQUEST:
      return state.set('loading', true).set('error', false);
    case WATER_SERVICE_METERS_PRICE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('price', action.price);
    case WATER_SERVICE_METERS_PRICE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    /*---------------------*/
    case WATER_SERVICE_METER_PRICE_EDIT_REQUEST:
      return state.set('loading', true).set('error', false);
    case WATER_SERVICE_METER_PRICE_EDIT_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('price', action.price);
    case WATER_SERVICE_METER_PRICE_EDIT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    /*---------------------*/
    case WATER_SERVICE_REQUEST:
      return state.set('loading', true).set('error', false);
    case WATER_SERVICE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('indication', action.indication);
    case WATER_SERVICE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    /*---------------------*/
    case WATER_SERVICE_INDICATION_ADD_REQUEST:
      console.log('REQUEST Reducer')
      return state
        .set('loading', true)
        .set('error', false);
    case WATER_SERVICE_INDICATION_ADD_SUCCESS:
      console.log('Reducer')
      // const oldState = state.get('indication');
      return state
        .set('loading', false)
        .set('error', false)
        .set('indication', action.indication);
    case WATER_SERVICE_INDICATION_ADD_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    /*---------------------*/
    default:
      return state;
  }
}

export default waterServiceMetersReducer;

