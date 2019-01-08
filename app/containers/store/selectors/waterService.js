import { createSelector } from 'reselect';

const selectWaterService = state => state.get('waterService');

export const makeSelectWaterServiceMeters = () =>
  createSelector(selectWaterService, waterServiceMetersState => {
    const meters = waterServiceMetersState.get('meters');
    return { ...meters };
  });

export const makeSelectWaterServiceMetersPrice = () =>
  createSelector(selectWaterService, waterServiceMetersState => {
    const price = waterServiceMetersState.get('price');
    return { ...price };
  });

export const makeSelectWaterServiceIndication = () =>
  createSelector(selectWaterService, waterServiceMetersState => {
    return waterServiceMetersState.get('indication');
  });
