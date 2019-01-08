import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { makeSelectWaterServiceIndication } from '../../containers/store/selectors/waterService';
import { initModal, openModal, closeModal } from '../../utils/materialize';
import * as actions from '../../containers/store/actions/waterService';

class WaterServiceMeters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNode: null,
      list: [],
    };
  }

  createTableBody = () => {
    const indications = this.props.indications;
    const trList = [];

    indications.forEach((indication, key) => {
      trList.push(
        <tr key={key}>
          <td>{indication.date}</td>
          <td>{indication.hotKittenValue}</td>
          <td>{indication.coldKittenValue}</td>
          <td>{indication.hotBathroomValue}</td>
          <td>{indication.coldBathroomValue}</td>
        </tr>,
      );
    });
    this.setState({ list: trList });
  };

  componentWillReceiveProps() {
    this.createTableBody();
  }

  componentDidMount() {
    const modalNode = document.querySelector('#modal-water-service-indications');
    initModal(modalNode);
    this.setState({ modalNode });
    this.createTableBody();
  }

  onClickMeter = () => {
    openModal(this.state.modalNode);
  };

  onSubmit = $event => {
    if ($event !== undefined && $event.preventDefault) $event.preventDefault();
    const { newIndication } = this.state;

    if (newIndication) {
      this.props.onSubmitNewIndications(newIndication);
      closeModal(this.state.modalNode);
    }
  };

  onChange = $event => {
    const oldState = this.state.newIndication;
    this.setState({ newIndication: { ...oldState, [$event.target.id]: $event.target.value } });
  };

  render() {
    const { list } = this.state;
    return (
      <div>
        <div>
          <button
            className="waves-effect waves-light btn"
            onClick={this.onClickMeter}
          >
            Добавить показание
          </button>
        </div>

        <table className="striped">
          <thead>
          <tr>
            <th>date</th>
            <th>hotKittenValue</th>
            <th>coldKittenValue</th>
            <th>hotBathroomValue</th>
            <th>coldBathroomValue</th>
          </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>


        <div id="modal-water-service-indications" className="modal">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="modal-content">
              <h4>Добавить показание</h4>

              <div className="container">
                <div className="row">
                  <div className="input-field col s6">
                    <input onChange={this.onChange} id="hotKittenValue" type="number" step="0.01" required
                           className="validate"/>
                    <label htmlFor="hotKittenValue">hot Kitten Value</label>
                  </div>
                  <div className="input-field col s6">
                    <input onChange={this.onChange} id="coldKittenValue" type="number" step="0.01" required
                           className="validate"/>
                    <label htmlFor="coldKittenValue">cold Kitten Value</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input onChange={this.onChange} id="hotBathroomValue" type="number" step="0.01" required
                           className="validate"/>
                    <label htmlFor="hotBathroomValue">hot Bathroom Value</label>
                  </div>
                  <div className="input-field col s6">
                    <input onChange={this.onChange} id="coldBathroomValue" type="number" step="0.01" required
                           className="validate"/>
                    <label htmlFor="coldBathroomValue">cold Bathroom Value</label>
                  </div>
                </div>

              </div>

            </div>
            <div className="modal-footer">
              <button
                className="waves-effect waves-green btn-flat"
                type="submit"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

WaterServiceMeters.propTypes = {
  onSubmitNewIndications: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  indications: makeSelectWaterServiceIndication(),
});

const mapDispatchToProps = dispatch => ({
  onSubmitNewIndications: (indication) =>{
    dispatch(actions.waterServiceAddIndicationRequest(indication))},
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WaterServiceMeters);
