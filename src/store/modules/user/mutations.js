const savePrefs = (state, payload) => {
    state.user = payload;
    state.avatar = localStorage.getItem("bm_avatar");
};

const savebanka = (state, payload) => {
  state.banka = payload;
}
  
export default {
    savebanka,
    savePrefs
};