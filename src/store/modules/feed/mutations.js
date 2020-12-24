const savePrefs = (state, payload) => {
    state.user = payload;
};

const banka = (state, payload) => {
  state.banka = payload;
}

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
}
  
export default {
  savePrefs,
  banka,
  overgoalslists,
  topTipsters,
  saveLivescore,
  saveNotStarted,
  saveFinished,
  saveTipsterSelection
};