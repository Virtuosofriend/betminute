const overgoalslists = (state, payload) => {    
    for ( let data of payload.dashboard ) {      
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
  
export default {
  overgoalslists,
};