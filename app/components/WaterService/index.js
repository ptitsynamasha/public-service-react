import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { makeSelectWaterService } from '../../containers/store/selectors/waterService';
import { initModal, openModal, closeModal } from '../../utils/materialize';
import * as actions from '../../containers/store/actions/waterService';

class WaterServiceMeters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNode: null,
      list: [],
    };
    this.initState();
  }

  initState = () => {
    this.state.editable = {
      key: '',
      value: '',
      newValue: '',
    };

  };

  createTableBody = () => {
    const waterService = this.props.waterService;
    const trList = [];

    if (waterService) {
      if (waterService.message) {
        trList.push(
          <tr key={0}>
            <td>Пока нет показаний</td>
          </tr>,
        );
      } else {
        for (const key in waterService) {
          const value = waterService[key];
          trList.push(
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>,
          );
        }
      }
      this.setState({ list: trList });
    }
  };

  componentWillReceiveProps() {
    this.createTableBody();
  }

  componentDidMount() {
    const modalNode = document.querySelector('#modal-water-service');
    initModal(modalNode);
    this.setState({ modalNode });
    this.createTableBody();
  }

  onClickMeter = key => {
    const value = this.props.waterService[key];
    this.setState({ editable: { key, value } });
    openModal(this.state.modalNode);
  };

  onSubmit = $event => {
    if ($event !== undefined && $event.preventDefault) $event.preventDefault();
    const { newValue, key } = this.state.editable;
    if (newValue) {
      this.props.onChangeWaterMeter(key, newValue);
      closeModal(this.state.modalNode);
      this.initState();
    }
  };

  onChange = $event => {
    const newValue = $event.target.value;
    const oldState = this.state.editable;
    this.setState({ editable: { ...oldState, newValue } });
  };

  render() {
    const { list } = this.state;
    const waterService = this.props.waterService;
    if (waterService.message) {
      return (
        <div>
          <h2>Пока нет показаний</h2>
        </div>
      );
    } else {
      return (
        <div>
          <table className="striped">
            <thead>
            <tr>
              <th>Счетчик</th>
              <th>Значение</th>
            </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>

          <div id="modal-water-service" className="modal">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="modal-content">
                <h4>Добавить показание</h4>
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
}

WaterServiceMeters.propTypes = {
  onChangeWaterMeter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  waterService: makeSelectWaterService(),
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
