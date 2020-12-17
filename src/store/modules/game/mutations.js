const saveGame = (state, payload) => {  
    state.game = payload;
};

const saveOdds =  (state, payload) => {
    state.odds = payload;
};

const saveH2H = (state, list) => {
    state.h2h = list;
}

export default {
    saveGame,
    saveOdds,
    saveH2H
};