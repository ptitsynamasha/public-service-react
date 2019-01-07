import React from 'react';
import H1 from 'components/H1';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from '../store/reducers/waterService';
import WaterServiceMeters from '../../components/WaterServiceMeters';
import WaterServiceMetersPrice from '../../components/WaterServiceMetersPrice';
import WaterService from '../../components/WaterService';
import { initCollapsible, initModal } from '../../utils/materialize';
import saga from '../store/saga/waterService';
import injectSaga from 'utils/injectSaga';

class IndicationPage extends React.PureComponent {
  componentDidMount() {
    const collapsible = document.querySelectorAll('.collapsible');
    initCollapsible(collapsible);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Indication Page</title>
          <meta name="description" content="Indication page"/>
        </Helmet>
        <H1>
          <span>Indication Page</span>
        </H1>


        <ul className="collapsible">
          <li>
            <div className="collapsible-header"><i className="material-icons">assignment</i>Показания счетчиков воды</div>
            <div className="collapsible-body">
              <WaterService />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

// const withWaterServiceMetersReducer = injectReducer({ key: 'waterServiceMeters', reducer });
// const withSaga = injectSaga({ key: 'waterServiceMeters', saga });

// export default compose(
//   withWaterServiceMetersReducer,
//   withSaga,
// )(IndicationPage);

export default IndicationPage;
