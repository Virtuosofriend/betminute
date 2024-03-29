const overgoalslists = (state, payload) => {    
    for ( let data of payload ) {      
        if ( data.dashboard.bm_market_id == 12 ) {
            state.listsOver1_5ft = data.dashboard;
        }

        if ( data.dashboard.bm_market_id == 37 ) {
            state.listsOver0_5ht = data.dashboard;
        }

        if ( data.dashboard.bm_market_id == 11 ) {
            state.listsOver0_5secondhalf = data.dashboard;
        }
    }
};

const topTipsters = (state, list) => {  
    state.topTipsters = list;
};

const saveLivescore = (state, payload) => {
    state.livescore = payload;
};

const saveNotStarted = (state, payload) => {  
    state.notStarted = payload;
};

const saveFinished = (state, payload) => {
    state.finished = payload;
};

const saveTipsterSelection = (state, selection) => {
    state.top_tipsters_selection = selection;
};

const saveFeedFilter = (state, filter) => {
    state.filter_feed = filter;
};

const saveFavoriteInFeed = (state, data) => {
    state.favorite_games_ids = data;
};

const removeFavoriteInFeed = (state, game_id) => {
    const position = state.favorite_games_ids.indexOf(game_id);
    state.favorite_games_ids.splice(position, 1);
};

const resetFeed = (state) => {
    state.livescore = [];
    state.notStarted = [];
    state.finished = [];
};

export default {
    overgoalslists,
    removeFavoriteInFeed,
    resetFeed,
    topTipsters,
    saveLivescore,
    saveNotStarted,
    saveFinished,
    saveTipsterSelection,
    saveFavoriteInFeed,
    saveFeedFilter
};