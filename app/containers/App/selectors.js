/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const selectLogin = state => state.get('login');

const selectMenu = state => state.get('menu');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['userData', 'repositories']),
  );

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectToken = () =>
  createSelector(selectLogin, loginState => loginState.get('token'));

const makeSelectWaterServiceMeters = () =>
  createSelector(selectMenu, menuState => {
    const hotWaterKitchen = menuState.get('hotWaterKitchen');
    const hotWaterBathroom = menuState.get('hotWaterBathroom');
    const coldWaterKitchen = menuState.get('coldWaterKitchen');
    const coldWaterBathroom = menuState.get('coldWaterBathroom');

    return {
      hotWaterKitchen,
      hotWaterBathroom,
      coldWaterKitchen,
      coldWaterBathroom
    }
  });

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectToken,
  makeSelectWaterServiceMeters,
};
