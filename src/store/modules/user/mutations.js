const savePrefs = (state, payload) => {
    state.user = payload;
};

const savebanka = (state, payload) => {
  state.banka = payload;
}
  
export default {
    savebanka,
    savePrefs
};