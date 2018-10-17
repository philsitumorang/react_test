import React, { Component } from 'react';
import { connect } from "react-redux";
import UserForm from '../containers/UserForm';
import { userForm } from '../store/forms';
import * as actions from '../store/actions';
import '../styles/popup.scss';

const mapStateToProps = state => {
  return {
    user: state.user,
    popup: state.popup
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTogglePopup: payload => dispatch(actions.togglePopup(payload))
  }
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    let payload = {
      popup: false,
      user : {...userForm}
    }
    this.props.onTogglePopup(payload);
  }

  render() {
    return (
      <div className="popup">
        {this.props.popup ?
        <div>
          <div className="overlay" onClick={this.togglePopup}></div>
          <div className="popup-wrapper">
            <div className="popup-block">
              <UserForm
                title="Редактировать"
                buttonName="Сохранить"
                method="updateUser"
              />
            </div>
          </div>
        </div>
        : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
