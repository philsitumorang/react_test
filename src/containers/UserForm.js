import React, { Component } from 'react';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask';
import * as actions from '../store/actions';
import Bdate from './Bdate';
import { userForm } from '../store/forms'
import '../styles/userform.scss';

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserForm: payload => dispatch(actions.actionUpdateUserForm(payload)),
    onAddUser: payload => dispatch(actions.actionAddUser(payload)),
    onClearUser: () => dispatch(actions.clearUserForm()),
    onUpdateUser: payload => dispatch(actions.updateUser(payload)),
    onTogglePopup: payload => dispatch(actions.togglePopup(payload)),
    onGetUsers: () => dispatch(actions.actionGetUsers()),
    onUpdateNotify: payload => dispatch(actions.updateNotify(payload))
  }
};

class UserForm extends Component {
  constructor(props) {
    super(props);

    if (props.method !== 'updateUser') {
      this.state = {
        user: {
          ...userForm
        }
      };
    } else {
      this.state = {
        user: {...props.user}
      }
    }

    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.refDay = React.createRef();
    this.refMonth = React.createRef();
    this.refYear = React.createRef();
  }

  clearForm() {
    this.refDay.current.select.clearValue();
    this.refMonth.current.select.clearValue();
    this.refYear.current.select.clearValue();

    let newState = { ...this.state };
    newState.user = { ...userForm };
    this.setState(newState);
    this.props.onClearUser();
  }

  checkForm() {
    if (
      this.props.user.bdate.day.value === '' ||
      this.props.user.bdate.month.value === '' ||
      this.props.user.bdate.year.value === ''
    ) {
      this.props.onUpdateNotify('Пожалуйста, укажите дату рождения.');
      return false;
    }
    if (this.props.user.address === '') {
      this.props.onUpdateNotify('Пожалуйста, укажите ваш адрес.');
      return false;
    }
    if (this.props.user.city === '') {
      this.props.onUpdateNotify('Пожалуйста, укажите ваш город.');
      return false;
    }
    if (
      this.props.user.phone === '' ||
      this.props.user.phone.match(/[\d]/gi).length < 11
    ) {
      this.props.onUpdateNotify('Пожалуйста, укажите ваш номер телефона.');
      return false;
    }

    return true;
  }

  addUser() {
    if (this.checkForm()) {
      this.props.onAddUser(this.props.user);
      this.clearForm();
      this.props.onGetUsers();
    }
  }

  updateUser() {
    if (this.checkForm()) {
      let payload = {
        users: this.props.users,
        user: this.props.user
      };
      this.props.onUpdateUser(payload);
      this.props.onTogglePopup({ popup: false, user: {...UserForm}});
      this.props.onGetUsers();
      this.clearForm();
    }
  }

  userFormHandler(event, field) {
    let newState = {...this.state};
    newState.user[field] = event.target.value;
    this.setState(newState);

    this.props.onUpdateUserForm({
      field,
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="user-form">
        <h1>{this.props.title}</h1>
        <div className="form-control">
          <input
            type="text"
            maxLength="100"
            onChange={ (event) => this.userFormHandler(event, 'fio') }
            value={this.state.user.fio}
            placeholder="ФИО"
          />
        </div>
        <Bdate day={this.refDay} month={this.refMonth} year={this.refYear} />
        <div className="form-control">
          <input
            type="text"
            maxLength="200"
            onChange={ (event) => this.userFormHandler(event, 'address') }
            value={this.state.user.address}
            placeholder="Адрес"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            maxLength="100"
            onChange={ (event) => this.userFormHandler(event, 'city') }
            value={this.state.user.city}
            placeholder="Город"
          />
        </div>
        <div className="form-control">
          <MaskedInput
            type="text"
            mask={['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholder="Телефон"
            onChange={(event) => this.userFormHandler(event, 'phone')}
            value={this.state.user.phone}
          />
        </div>
        <div className="form-control align-right">
          <button type="button" onClick={this[this.props.method]}>{this.props.buttonName}</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
