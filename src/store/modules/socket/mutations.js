const socketStatus = ( state, data ) => state.socket = data;
const changeSocketTimer = ( state, data ) => state.timer = data;

export default {
    changeSocketTimer,
    socketStatus
};