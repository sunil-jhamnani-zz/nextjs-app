import { combineReducers } from 'redux';
import currentUser from './currentUser';
import notifications from './notifications';

export default combineReducers({
  currentUser,
  notifications
});