import { SHOW_NOTIFICATION } from '../actionTypes/notificationTypes';
const initialState = {
  message: '',
  type: ''
}

export default (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, message: action.payload.message, type: action.payload.type };
    default:
      return state
  }
}