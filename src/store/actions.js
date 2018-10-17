import * as actionTypes from './actionTypes';

export const actionUpdateBdate = payload => {
  return {
    type: actionTypes.UPDATE_BDATE,
    payload
  }
}

export const actionUpdateDaysInMonth = payload => {
  return {
    type: actionTypes.UPDATE_DAYS_IN_MONTH,
    payload
  }
}

export const actionUpdateUserForm = payload => {
  return {
    type: actionTypes.UPDATE_USER_FORM,
    payload
  }
}

export const actionAddUser = payload => {
  let users = localStorage.getItem('users')
  if (users == null) {
    localStorage.setItem('users', JSON.stringify([payload]))
  } else {
    users = JSON.parse(users)
    localStorage.setItem('users', JSON.stringify(users.concat(payload)))
  }

  return {
    type: actionTypes.ADD_USER,
    payload
  }
}

export const actionGetUsers = () => {
  let users = localStorage.getItem('users');
  users = users == null ? [] : JSON.parse(users)

  return {
    type: actionTypes.GET_USERS,
    payload: users
  }
}

export const clearUserForm = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
}

export const deleteUser = payload => {
  let users = payload.users.filter((user, index) => payload.index !== index)

  localStorage.setItem('users', JSON.stringify(users));

  return {
    type: actionTypes.DELETE_USER,
    payload: users
  }
}

export const updateUser = payload => {
  payload.users.forEach((user, index) => {
    if (payload.index === index) {
      user = payload.user;
    }
  })

  localStorage.setItem('users', JSON.stringify(payload.users));

  return {
    type: actionTypes.UPDATE_USER,
    payload: payload.users
  }
}

export const togglePopup = payload => {
  return {
    type: actionTypes.TOGGLE_POPUP,
    payload
  }
}

export const updateNotify = payload => {
  return {
    type: actionTypes.UPDATE_NOTIFY,
    payload
  }
}