import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actionTypes/notificationTypes';

export const ShowNotification = (message, type) => ({
  type: SHOW_NOTIFICATION,
  payload:{
    message,
    type
  }
});

export const HideNotification = () => ({
  type: HIDE_NOTIFICATION
});
