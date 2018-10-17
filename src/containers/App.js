import React, { Component } from 'react';
import UserForm from './UserForm';
import Users from './Users';
import Popup from './Popup';
import Notify from './Notify';
import '../styles/app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notify />
        <Popup />
        <UserForm
          title="Добавить пользователя"
          buttonName="Добавить"
          method="addUser"
        />
        <Users />
      </div>
    );
  }
}

export default App;
