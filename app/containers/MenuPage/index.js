import React from 'react';
import H1 from 'components/H1';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import WaterServiceMeters from '../../components/WaterServiceMeters';
import { initCollapsible, initModal } from '../../utils/materialize';
import saga from './saga';
import injectSaga from 'utils/injectSaga';

class MenuPage extends React.PureComponent {
  componentDidMount() {
    const collapsible = document.querySelectorAll('.collapsible');
    initCollapsible(collapsible);

  }

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


        <ul className="collapsible">
          <li>
            <div className="collapsible-header"><i className="material-icons">filter_drama</i>Счетчики воды</div>
            <div className="collapsible-body">
              <WaterServiceMeters/>
            </div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
        </ul>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'menu', reducer });
const withSaga = injectSaga({ key: 'menu', saga });

export default compose(
  withReducer,
  withSaga,
)(MenuPage);
