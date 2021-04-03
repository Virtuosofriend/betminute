const saveGame = (state, payload) => {  
    state.game = payload;
};

const saveOdds =  (state, payload) => {
    state.odds = payload;
};

const saveH2H = (state, list) => {
    state.h2h = list;
};

const resetGame = (state) => state.game = {};

export default {
    resetGame,
    saveGame,
    saveOdds,
    saveH2H
};