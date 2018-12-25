import React from 'react';
import { Helmet } from 'react-helmet';
import H1 from 'components/H1';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Form from 'components/Form';
import * as actions from './actions';

export class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
          <meta name="description" content="login page" />
        </Helmet>
        <H1>
          <span>Login Page</span>
        </H1>
        <Form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.onChange}
          />
          <button type="submit">Submit</button>
        </Form>
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
    const { email, password } = this.state;
    // TODO validate
    this.props.onLogin({ email, password });
  };
}

LoginPage.propTypes = {
  username: PropTypes.string,
  onLogin: PropTypes.func,
};

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
});
const mapDispatchToProps = dispatch => ({
  onLogin: ({ email, password }) =>
    dispatch(actions.loginRequest(email, password)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
