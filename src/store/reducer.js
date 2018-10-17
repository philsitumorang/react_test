import * as actionTypes from './actionTypes';
import { userForm } from './forms'

const initialState = {
  daysInMonth: 31,
  user: { ...userForm},
  users: [],
  popup: false,
  notify: ''
};

const reducer = (state = initialState, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.UPDATE_BDATE:
      newState = { ...state };
      newState.user.bdate[action.payload.dateType] = action.payload.value;

      return newState;

    case actionTypes.UPDATE_DAYS_IN_MONTH:
      return {
        ...state,
        daysInMonth: action.payload
      }

    case actionTypes.UPDATE_USER_FORM:
      newState = { ...state };
      newState.user[action.payload.field] = action.payload.value;
      return newState;

    case actionTypes.ADD_USER:
      return {
        ...state,
        users: state.users.concat(action.payload)
      }

    case actionTypes.CLEAR_USER:
      return {
        ...state,
        user: { ...userForm}
      }

    case actionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload
      }

    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: action.payload
      }

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: action.payload
      }

    case actionTypes.TOGGLE_POPUP:
      return {
        ...state,
        popup: action.payload.popup,
        user: action.payload.user
      }

    case actionTypes.UPDATE_NOTIFY:
      return {
        ...state,
        notify: action.payload
      }

    default:
      return state;
  }

}

export default reducer;