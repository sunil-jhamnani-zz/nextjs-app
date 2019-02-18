import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actionTypes/notificationTypes';

const initialState = {
  message: '',
  type: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, message: action.payload.message, type: action.payload.type };
    case HIDE_NOTIFICATION:
      return { ...state, message: '', type: '' };
    default:
      return state;
  }
};
