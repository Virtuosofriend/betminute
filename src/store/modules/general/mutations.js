const showNotification = (state, payload) => {
    state.tipping_notification = payload;
};

const showOverlay = (state, status) => { state.overlay = status; };

export default {
    showNotification,
    showOverlay
};