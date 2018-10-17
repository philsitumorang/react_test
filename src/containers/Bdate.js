import React, { Component } from 'react';
import { connect } from "react-redux";
import '../styles/userform.scss';
import Select from 'react-select';
import { actionUpdateBdate, actionUpdateDaysInMonth } from '../store/actions';

const mapStateToProps = state => {
  return {
    daysInMonth: state.daysInMonth,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateBdate: (payload) => dispatch(actionUpdateBdate(payload)),
    onUpdateDaysInMonth: (payload) => dispatch(actionUpdateDaysInMonth(payload))
  }
}

class UserForm extends Component {

  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  getDays() {
    let optionDays = [];
    for (let i = 1; i <= this.props.daysInMonth; i++) {
      let n10 = i < 10 ? i = `0${i}` : i
      optionDays.push({
        value: n10,
        label: n10
      })
    }
    return optionDays;
  };

  getMonths() {
    return [
      { value: '01', label: 'Января' },
      { value: '02', label: 'Февраля' },
      { value: '03', label: 'Марта' },
      { value: '04', label: 'Апреля' },
      { value: '05', label: 'Мая' },
      { value: '06', label: 'Июня' },
      { value: '07', label: 'Июля' },
      { value: '08', label: 'Августа' },
      { value: '09', label: 'Сентября' },
      { value: '10', label: 'Октября' },
      { value: '11', label: 'Ноября' },
      { value: '12', label: 'Декабря' }
    ];
  };

  getYears() {
    let years = [];
    for (let i = new Date().getFullYear(); i >= 1930; i--) {
      years.push({
        value: i,
        label: i
      })
    }
    return years;
  }

  updateDaysInMonth() {
    if (
      this.props.user.bdate.month > 0 &&
      this.props.user.bdate.year > 0
    ) {
      let days = new Date(
        this.props.user.bdate.year,
        this.props.user.bdate.month - 1,
        0
      ).getDate()

      this.props.onUpdateDaysInMonth(days);
    }
  }

  handleDayChange(selectedOption) {
    if (selectedOption) {
      this.props.onUpdateBdate({
        dateType: 'day',
        value: selectedOption
      })
    }
  }

  handleMonthChange(selectedOption) {
    if (selectedOption) {
      this.props.onUpdateBdate({
        dateType: 'month',
        value: selectedOption
      })
      this.updateDaysInMonth();
    }
  }

  handleYearChange(selectedOption) {
    if (selectedOption) {
      this.props.onUpdateBdate({
        dateType: 'year',
        value: selectedOption
      })
      this.updateDaysInMonth();
    }
  }

  render() {
    return (
      <div className="form-control">
        <small>Дата рождения</small>
        <div className="select-birthday-block">
          <div className="select-birthday">
            <Select
              ref={this.props.day}
              options={this.getDays()}
              onChange={this.handleDayChange}
              placeholder="ДД"
              defaultValue={this.props.user.bdate.day}
            />
          </div>
          <div className="select-birthday">
            <Select
              ref={this.props.month}
              options={this.getMonths()}
              onChange={this.handleMonthChange}
              placeholder="ММ"
              defaultValue={this.props.user.bdate.month}
            />
          </div>
          <div className="select-birthday">
            <Select
              ref={this.props.year}
              options={this.getYears()}
              onChange={this.handleYearChange}
              placeholder="ГГГГ"
              defaultValue={this.props.user.bdate.year}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
