import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { makeSelectWaterServiceMetersPrice } from '../../containers/store/selectors/waterService';
import { initModal, openModal, closeModal } from '../../utils/materialize';
import * as actions from '../../containers/store/actions/waterService';

class WaterServiceMetersPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalNode: null,
      priceList: [],
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
    const price = this.props.price;
    const trList = [];

    if (price) {
      for (const key in price) {
        const value = price[key];
        trList.push(
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
            <td>
              <button
                className="waves-effect waves-light btn"
                onClick={this.onClickPrice.bind(this, key)}
              >
                Редактировать
              </button>
            </td>
          </tr>,
        );
      }
      this.setState({ priceList: trList });
    }
  };

  componentWillReceiveProps() {
    this.createTableBody();
  }

  componentDidMount() {
    const modalNode = document.querySelector('#modal-water-service-meters-price');
    initModal(modalNode);
    this.setState({ modalNode });
    this.createTableBody();
  }

  onClickPrice = key => {
    const value = this.props.price[key];
    this.setState({ editable: { key, value } });
    openModal(this.state.modalNode);
  };

  onSubmit = $event => {
    if ($event !== undefined && $event.preventDefault) $event.preventDefault();
    const { newValue, key } = this.state.editable;
    if (newValue) {
      this.props.onChangePrice(key, newValue);
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
    const { priceList, editable } = this.state;
    return (
      <div>
        <table className="striped">
          <thead>
          <tr>
            <th>Счетчик</th>
            <th>Цена</th>
          </tr>
          </thead>
          <tbody>{priceList}</tbody>
        </table>

        <div id="modal-water-service-meters-price" className="modal">
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

WaterServiceMetersPrice.propTypes = {
  onChangePrice: PropTypes.func,
  price: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  price: makeSelectWaterServiceMetersPrice(),
});

const mapDispatchToProps = dispatch => ({
  onChangePrice: (key, newValue) =>
    dispatch(actions.waterServiceMeterPriceEditRequest(key, newValue)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WaterServiceMetersPrice);
