import React from 'react';
import H1 from 'components/H1';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
import { waterServiceMetersRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { makeSelectToken } from 'containers/App/selectors';

export class MenuPage extends React.PureComponent {
  getWaterServiceMeters = () => {
    console.log('12');
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Menu Page</title>
          <meta name="description" content="Menu page"/>
        </Helmet>
        <H1>
          <span>Menu Page</span>
        </H1>
        <div>
          <button onClick={this.props.onWaterServiceMeters}>
            Посмотреть счетчики воды
          </button>
        </div>
      </div>
    );
  }
}

MenuPage.propTypes = {
  onWaterServiceMeters: PropTypes.func,
  // token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  // token: makeSelectToken(),
});


const mapDispatchToProps = dispatch => ({
  onWaterServiceMeters: () => dispatch(waterServiceMetersRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'menu', reducer });
const withSaga = injectSaga({ key: 'menu', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MenuPage);
