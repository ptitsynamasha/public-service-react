import { toast } from '../../../utils/materialize';

export const WATER_SERVICE_METERS_REQUEST = 'WATER_SERVICE_METERS_REQUEST';
export const WATER_SERVICE_METERS_SUCCESS = 'WATER_SERVICE_METERS_SUCCESS';
export const WATER_SERVICE_METERS_ERROR = 'WATER_SERVICE_METERS_ERROR';
export const WATER_SERVICE_METER_EDIT_REQUEST =
  'WATER_SERVICE_METER_EDIT_REQUEST';
export const WATER_SERVICE_METER_EDIT_SUCCESS =
  'WATER_SERVICE_METER_EDIT_SUCCESS';
export const WATER_SERVICE_METER_EDIT_ERROR = 'WATER_SERVICE_METER_EDIT_ERROR';
export const WATER_SERVICE_METERS_PRICE_REQUEST = 'WATER_SERVICE_METERS_PRICE_REQUEST';
export const WATER_SERVICE_METERS_PRICE_SUCCESS = 'WATER_SERVICE_METERS_PRICE_SUCCESS';
export const WATER_SERVICE_METERS_PRICE_ERROR = 'WATER_SERVICE_METERS_PRICE_ERROR';
export const WATER_SERVICE_METER_PRICE_EDIT_REQUEST =
  'WATER_SERVICE_METER_PRICE_EDIT_REQUEST';
export const WATER_SERVICE_METER_PRICE_EDIT_SUCCESS =
  'WATER_SERVICE_METER_PRICE_EDIT_SUCCESS';
export const WATER_SERVICE_METER_PRICE_EDIT_ERROR = 'WATER_SERVICE_METER_PRICE_EDIT_ERROR';
export const WATER_SERVICE_REQUEST = 'WATER_SERVICE_REQUEST';
export const WATER_SERVICE_SUCCESS = 'WATER_SERVICE_SUCCESS';
export const WATER_SERVICE_ERROR = 'WATER_SERVICE_ERROR';

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
    meters: {
      hotWaterKitchen,
      hotWaterBathroom,
      coldWaterKitchen,
      coldWaterBathroom,
    },
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
    meters: {
      hotWaterKitchen,
      hotWaterBathroom,
      coldWaterKitchen,
      coldWaterBathroom,
    },
  };
}

export function waterServiceMetersError(status, error) {
  toast(status, error.message);
  return {
    type: WATER_SERVICE_METERS_ERROR,
    error,
  };
}

export function waterServiceMeterEditError(status, error) {
  toast(status, error.message);
  return {
    type: WATER_SERVICE_METER_EDIT_ERROR,
    error,
  };
}

export function waterServiceMetersPriceSuccess({
                                                 hotWaterPrice,
                                                 coldWaterPrice,
                                                 sewagePrice,
                                               }) {
  return {
    type: WATER_SERVICE_METERS_PRICE_SUCCESS,
    price: {
      hotWaterPrice,
      coldWaterPrice,
      sewagePrice,
    },
  };
}

export function waterServiceMetersPriceError(status, error) {
  toast(status, error.message);
  return {
    type: WATER_SERVICE_METERS_PRICE_ERROR,
    error,
  };
}

export function waterServiceMeterPriceEditRequest(key, value) {
  return {
    type: WATER_SERVICE_METER_PRICE_EDIT_REQUEST,
    key,
    value,
  };
}

export function waterServiceMeterPriceEditSuccess({
                                                    hotWaterPrice,
                                                    coldWaterPrice,
                                                    sewagePrice,
                                                  }) {
  return {
    type: WATER_SERVICE_METER_PRICE_EDIT_SUCCESS,
    price: {
      hotWaterPrice,
      coldWaterPrice,
      sewagePrice,
    },
  };
}

export function waterServiceMeterPriceEditError(status, error) {
  toast(status, error.message);
  return {
    type: WATER_SERVICE_METER_PRICE_EDIT_ERROR,
    error,
  };
}

export function waterServiceSuccess({
                                      date,
                                      hotKittenValue,
                                      coldKittenValue,
                                      hotBathroomValue,
                                      coldBathroomValue,
  message
                                    }) {
  return {
    type: WATER_SERVICE_SUCCESS,
    data: {
      date,
      hotKittenValue,
      coldKittenValue,
      hotBathroomValue,
      coldBathroomValue,
      message,
    },
  };
}

export function waterServiceError(status, error) {
  toast(status, error.message);
  return {
    type: WATER_SERVICE_ERROR,
    error,
  };
}
