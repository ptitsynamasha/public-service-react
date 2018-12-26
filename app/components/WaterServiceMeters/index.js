import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { makeSelectWaterServiceMeters } from '../../containers/App/selectors';
import { initModal, openModal, closeModal } from '../../utils/materialize';
import * as actions from '../../containers/MenuPage/actions';

class WaterServiceMeters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNode: null,
      metersList: [],
      editable: {
        key: '',
        value: '',
        newValue: '',
      },
    };
  }

  createTableBody = () => {
    const meters = this.props.meters;
    const trList = [];
    console.log('meters', meters);
    if (meters) {
      for (const key in meters) {
        const value = meters[key];
        trList.push(
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
            <td>
              <button
                className="waves-effect waves-light btn"
                onClick={this.onClickMeter.bind(this, key)}
              >
                Редактировать
              </button>
            </td>
          </tr>,
        );
      }
      this.setState({ metersList: trList });
    }
  };

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
    this.createTableBody();
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  componentDidMount() {
    const modalNode = document.querySelector('.modal');
    initModal(modalNode);
    this.setState({ modalNode });
    this.createTableBody();
  }

  onClickMeter = key => {
    const value = this.props.meters[key];
    this.setState({ editable: { key, value } });
    openModal(this.state.modalNode);
  };

  onSubmit = $event => {
    if ($event !== undefined && $event.preventDefault) $event.preventDefault();
    const { newValue, key } = this.state.editable;
    if (newValue) {
      this.props.onChangeWaterMeter(key, newValue);
      closeModal(this.state.modalNode);
    }
  };

  onChange = $event => {
    const newValue = $event.target.value;
    const oldState = this.state.editable;
    this.setState({ editable: { ...oldState, newValue } });
  };

  render() {
    const { metersList, editable } = this.state;
    return (
      <div>
        <table className="striped">
          <thead>
          <tr>
            <th>Счетчик</th>
            <th>Номер</th>
          </tr>
          </thead>
          <tbody>{metersList}</tbody>
        </table>

        <div id="modal1" className="modal">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="modal-content">
              <h4>Редактировать {editable.key}</h4>
              <div className="input-field inline">
                <input
                  id="number_inline"
                  type="text"
                  className="validate"
                  onChange={this.onChange}
                />
                <label htmlFor="number_inline">Номер</label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                >
                  {editable.value}
                </span>
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
  onChangeWaterMeter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  meters: makeSelectWaterServiceMeters()
});

const mapDispatchToProps = dispatch => ({
  onChangeWaterMeter: (key, newValue) =>
    dispatch(actions.waterServiceMeterEditRequest(key, newValue)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WaterServiceMeters);
