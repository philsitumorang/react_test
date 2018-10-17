import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import '../styles/users.scss';

const mapStateToProps = state => {
  return {
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => dispatch(actions.actionGetUsers()),
    onDeleteUser: payload => dispatch(actions.deleteUser(payload)),
    onTogglePopup: payload => dispatch(actions.togglePopup(payload))
  }
};

class Users extends Component {

  componentDidMount() {
    this.props.onGetUsers();
  }

  deleteUser(payload) {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      this.props.onDeleteUser(payload)
    }
  }

  togglePopup(payload) {
    payload.popup = true;
    this.props.onTogglePopup(payload);
  }

  render() {
    return (
      <div className="users">
        {this.props.users.map((user, index) =>
          <div className="user" key={index}>
            <div className="controls">
              <span className="link" onClick={() => this.togglePopup({ index, user })}>Редактировать</span> | <span className="link" onClick={() => this.deleteUser({ index, users: this.props.users })}>Удалить</span>
            </div>
            <div className="user-field"><b>{user.fio}</b></div>
            <div className="user-field">{`${user.bdate.day.value}.${user.bdate.month.value}.${user.bdate.year.value}`}</div>
            <div className="user-field">{user.address}</div>
            <div className="user-field">{user.city}</div>
            <div className="user-field">{user.phone}</div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
