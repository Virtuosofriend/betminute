const incrementSocket = ({ commit, state }) => {
    let timer = ++state.timer
    commit("changeSocketTimer", timer);
};

const setTimerSocket = ({ commit }, payload) => {
    commit("changeSocketTimer", payload);
};

export default {
    incrementSocket,
    setTimerSocket
};