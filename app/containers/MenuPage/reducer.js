import { fromJS } from 'immutable';

import {
  WATER_SERVICE_METERS_REQUEST,
  WATER_SERVICE_METERS_SUCCESS,
  WATER_SERVICE_METERS_ERROR,
  WATER_SERVICE_METER_EDIT_REQUEST,
  WATER_SERVICE_METER_EDIT_ERROR, WATER_SERVICE_METER_EDIT_SUCCESS,
} from './actions';

export const initialState = fromJS({
  hotWaterKitchen: null,
  hotWaterBathroom: null,
  coldWaterKitchen: null,
  coldWaterBathroom: null,
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
        .set('hotWaterKitchen', action.hotWaterKitchen)
        .set('hotWaterBathroom', action.hotWaterBathroom)
        .set('coldWaterKitchen', action.coldWaterKitchen)
        .set('coldWaterBathroom', action.coldWaterBathroom);
    case WATER_SERVICE_METER_EDIT_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('hotWaterKitchen', action.hotWaterKitchen)
        .set('hotWaterBathroom', action.hotWaterBathroom)
        .set('coldWaterKitchen', action.coldWaterKitchen)
        .set('coldWaterBathroom', action.coldWaterBathroom);
    case WATER_SERVICE_METERS_ERROR:
      return state
        .set('error', action.error)
        .set('token', false)
        .set('loading', false);
    case WATER_SERVICE_METER_EDIT_REQUEST:
      return state
        .set('loading', false)
        .set('error', false);
    case WATER_SERVICE_METER_EDIT_ERROR:
      return state
        .set('error', action.error)
        .set('token', false)
        .set('loading', false);
    default:
      return state;
  }
}

export default waterServiceMetersReducer;
