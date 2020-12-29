const setOverlay = ({ commit, state }) => {
    const result = !state.overlay;
    commit("showOverlay", result)
};
export default {
    setOverlay
};