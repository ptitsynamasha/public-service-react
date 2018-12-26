import React from 'react';
import { Helmet } from 'react-helmet';
import H1 from 'components/H1';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import * as actions from './actions';

export class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
          <meta name="description" content="login page"/>
        </Helmet>
        <H1>
          <span>Login Page</span>
        </H1>

        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this.onChange} name="username" type="text" className="validate"/>
                <label htmlFor="username">Telegram Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this.onChange} name="password" type="password" className="validate"/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onChange = $event => {
    const name = $event.target.name;
    const value = $event.target.value;
    this.setState({ [name]: value });
  };

  onSubmit = $event => {
    if ($event !== undefined && $event.preventDefault) $event.preventDefault();
    const { username, password } = this.state;
    // TODO validate
    this.props.onLogin({ username, password });
  };
}

LoginPage.propTypes = {
  username: PropTypes.string,
  onLogin: PropTypes.func,
};

const mapStateToProps = state => ({
  login: state.login,
  password: state.password,
});
const mapDispatchToProps = dispatch => ({
  onLogin: ({ username, password }) =>
    dispatch(actions.loginRequest(username, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
