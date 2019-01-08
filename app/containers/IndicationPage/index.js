import React from 'react';
import H1 from 'components/H1';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from '../store/reducers/waterService';
import WaterServiceMeters from '../../components/WaterServiceMeters';
import WaterServiceMetersPrice from '../../components/WaterServiceMetersPrice';
import WaterService from '../../components/WaterService';
import { initTabs, initModal } from '../../utils/materialize';
import saga from '../store/saga/waterService';
import injectSaga from 'utils/injectSaga';

class IndicationPage extends React.PureComponent {
  componentDidMount() {
    const tabs = document.querySelectorAll('.tabs');
    initTabs(tabs);
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

       <section>
         <ul className="tabs tabs-fixed-width tab-demo z-depth-1">
           <li className="tab"><a className="active"  href="#test1">Вода</a></li>
           <li className="tab"><a href="#test2">Test 2</a></li>
         </ul>
         <div id="test1" className="col s12"><WaterService /></div>
         <div id="test2" className="col s12"><p>Test 2</p></div>
       </section>
      </div>
    );
  }
}

export default IndicationPage;
