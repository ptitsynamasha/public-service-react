export const WATER_SERVICE_METERS_REQUEST = 'WATER_SERVICE_METERS_REQUEST';
export const WATER_SERVICE_METERS_SUCCESS = 'WATER_SERVICE_METERS_SUCCESS';
export const WATER_SERVICE_METERS_ERROR = 'WATER_SERVICE_METERS_ERROR';
export const WATER_SERVICE_METER_EDIT_REQUEST =
  'WATER_SERVICE_METER_EDIT_REQUEST';
export const WATER_SERVICE_METER_EDIT_SUCCESS =
  'WATER_SERVICE_METER_EDIT_SUCCESS';
export const WATER_SERVICE_METER_EDIT_ERROR = 'WATER_SERVICE_METER_EDIT_ERROR';

export function waterServiceMetersRequest(chatId, token) {
  return {
    type: WATER_SERVICE_METERS_REQUEST,
    chatId,
    token,
  };
}

export function waterServiceMeterEditRequest(key, value) {
  return {
    type: WATER_SERVICE_METER_EDIT_REQUEST,
    key,
    value,
  };
}

export function waterServiceMetersSuccess({
  hotWaterKitchen,
  hotWaterBathroom,
  coldWaterKitchen,
  coldWaterBathroom,
}) {
  return {
    type: WATER_SERVICE_METERS_SUCCESS,
    hotWaterKitchen,
    hotWaterBathroom,
    coldWaterKitchen,
    coldWaterBathroom,
  };
}

export function waterServiceMeterEditSuccess({
  hotWaterKitchen,
  hotWaterBathroom,
  coldWaterKitchen,
  coldWaterBathroom,
}) {
  return {
    type: WATER_SERVICE_METER_EDIT_SUCCESS,
    hotWaterKitchen,
    hotWaterBathroom,
    coldWaterKitchen,
    coldWaterBathroom,
  };
}

export function waterServiceMetersError(error) {
  return {
    type: WATER_SERVICE_METERS_ERROR,
    error,
  };
}

export function waterServiceMeterEditError(error) {
  return {
    type: WATER_SERVICE_METER_EDIT_ERROR,
    error,
  };
}
