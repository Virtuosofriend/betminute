const saveGame = (state, payload) => {  
  state.game = payload;
};

const saveOdds =  (state, payload) => {
  state.odds = payload;
};

export default {
  saveGame,
  saveOdds
};