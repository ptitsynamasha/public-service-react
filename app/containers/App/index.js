/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import FeaturePage from 'containers/FeaturePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LoginPage from 'containers/LoginPage/Loadable';
import MenuPage from 'containers/MenuPage';
import IndicationPage from 'containers/IndicationPage';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import reducer from '../LoginPage/reducer';
import saga from '../LoginPage/saga';
// import ProtectedRoute from '../../components/ProtectedRoute';
import { createStructuredSelector } from 'reselect';
import { makeSelectToken } from './selectors';
import connect from 'react-redux/es/connect/connect';
import { mapDispatchToProps } from '../HomePage';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App() {
    return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application"/>
      </Helmet>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/features" component={FeaturePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/indication" component={IndicationPage}/>
        <Route path='/menu' component={MenuPage}/>
        <Route path="" component={NotFoundPage}/>
      </Switch>
      <Footer/>
      <GlobalStyle/>
    </AppWrapper>
  );
}

// function ProtectedRoute({ authToken, component: Component, ...rest }) {
//   console.log(authToken);
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authToken ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }


const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
});

const withConnect = connect(
  mapStateToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
