import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  listsOver0_5ht: { open:[] },
  listsOver0_5secondhalf: { open:[] },
  listsOver1_5ft: { open:[] },
  topTipsters: [],
  user: {},
  banka: {
    banka_info: {}
  },
  livescore: [{"country":"Belarus","code":"BLR","league_matches":[{"id":199,"league_name":"Vysshaya Liga","country_id":212,"match_data":[{"id":12021302,"league_id":199,"season_id":16964,"stage_id":77447013,"group_id":0,"round_id":191190,"localteam_id":6507,"visitorteam_id":3791,"local_pos":15,"visitor_pos":11,"starting_at":"2020-04-24T15:00:00","minute":80,"second":31,"added_time":3,"extra_time":null,"injury_time":1,"status":"LIVE","local_scr":1,"visit_scr":3,"ht_score":"0-2","home_team":"Vigvam Smolevichi","away_team":"Dinamo Minsk","localteam_logo":"https://www.sofascore.com/images/team-logo/football_42964.png","visitorteam_logo":"https://cdn.sportmonks.com/images/soccer/teams/15/3791.png","event_goal":true,"event_missed_penalty":false,"yellowcard":true,"redcard":true,"event_corner":true,"match_has_tips":true,"weight_rank":null,"hot30":null,"hot70":null,"wait_goal":true,"match_mobility":null}]}]}]
  ,
  notStarted: [],
  finished: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
