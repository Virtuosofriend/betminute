const sendNotification = (state, message) => {  
  state.notifications.message = message;
  state.notifications.status = true;
};

const dialog = (state, message) => {
  state.dialog.status = true;
  state.dialog.data = message.data;
  state.dialog.action = message.action
};
  
export default {
  sendNotification,
  dialog
};