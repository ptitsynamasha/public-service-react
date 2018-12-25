export const WATER_SERVICE_METERS_REQUEST = 'WATER_SERVICE_METERS_REQUEST';
export const WATER_SERVICE_METERS_SUCCESS = 'WATER_SERVICE_METERS_SUCCESS';
export const WATER_SERVICE_METERS_ERROR = 'WATER_SERVICE_METERS_ERROR';

export function waterServiceMetersRequest(chatId, token) {
  return {
    type: WATER_SERVICE_METERS_REQUEST,
    chatId,
    token,
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

export function waterServiceMetersError(error) {
  return {
    type: WATER_SERVICE_METERS_ERROR,
    error,
  };
}
