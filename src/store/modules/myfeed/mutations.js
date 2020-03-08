const saveLivescore = (state, payload) => {
  state.livescore = payload;
};

const saveNotStarted = (state, payload) => {  
  state.notStarted = payload;
};

const saveFinished = (state, payload) => {
  state.finished = payload;
};

export default {
  saveLivescore,
  saveNotStarted,
  saveFinished
};