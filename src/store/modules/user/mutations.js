const savePrefs = (state, payload) => {
    state.user = payload;
};

const banka = (state, payload) => {
  state.banka = payload;
}
  
export default {
  savePrefs,
  banka
};