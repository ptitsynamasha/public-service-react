import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { makeSelectToken } from 'containers/App/selectors';
import { push } from 'connected-react-router/immutable';

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, token, ...rest } = this.props;
    console.log('Component', Component)
    return (
      <Route {...rest} render={props => {
        return token
          ? <Component {...this.props} />
          : <Redirect to="/login"/>;
      }}/>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
});
export default connect(mapStateToProps)(ProtectedRoute);

