import Socket from '../../../plugins/socket'
import axios from "axios";

const gameInfo = async ({ commit }, payload) => {    
    try {

        const odds = (payload.status == "LIVE" || payload.status == "HT" ) ? "livegame_odds" : "pregame_odds";

        const message = `{
            "fetchdata":{
                "matchview": {
                    "id": ${payload.gameID},
                    "data": ["bm_pregame_data", "bm_static_data", "match_stats", "bm_live_data", "livescore_lineup", "${odds}", "textbot"]
                } 
            }
        }`;     
          
        setTimeout(() =>{
            Socket.send(message);
        }, 500);
        

    } catch(e) {
        console.log(e.response);
        
    }
};

const fetch_h2h = async( {commit }, payload) => {
    try {
        const response = (await axios.post(`FetchBetMinNode.php?bm_h2h_id=${payload}`)).data;
        
        // Mapping of the response, until the backend fixes it

        const home_response = {
            home: {
                number_of_matches:          response.home.home.nohomegames,
                first_half_for:             response.home.home.hfhfor,
                first_half_against:         response.home.home.hfhagainst,
                second_half_for:            response.home.home.hshfor,
                second_half_against:        response.home.home.hshagainst,
                total_for:                  response.home.home.hhfor,
                total_against:              response.home.home.hhagainst,
                goals_pie: {
                    goals_0_1: {
                        matches:            response.home.home.hhgsum1,
                        percentage:         response.home.home.hhgsum1p * 100,
                        label:              "goals_0_1"
                    },
                    goals_2_3: {
                        matches:            response.home.home.hhgsum2,
                        percentage:         response.home.home.hhgsum2p * 100,
                        label:              "goals_2_3"
                    },
                    goals_4_6: {
                        matches:            response.home.home.hhgsum3,
                        percentage:         response.home.home.hhgsum3p * 100,
                        label:              "goals_4_6"
                    },
                    goals_7: {
                        matches:            response.home.home.hhgsum4,
                        percentage:         response.home.home.hhgsum4p * 100,
                        label:              "goals_7"
                    }
                }
            },
            away: {
                number_of_matches:          response.home.away.noawaygames,
                first_half_for:             response.home.away.afhfor,
                first_half_against:         response.home.away.afhagainst,
                second_half_for:            response.home.away.ashfor,
                second_half_against:        response.home.away.ashagainst,
                total_for:                  response.home.away.ahfor,
                total_against:              response.home.away.ahagainst,
                goals_pie: {
                    goals_0_1: {
                        matches:            response.home.away.hasum1,
                        percentage:         response.home.away.hasum1p * 100,
                        label:              "goals_0_1"
                    },
                    goals_2_3: {
                        matches:            response.home.away.hasum2,
                        percentage:         response.home.away.hasum2p * 100,
                        label:              "goals_2_3"
                    },
                    goals_4_6: {
                        matches:            response.home.away.hasum3,
                        percentage:         response.home.away.hasum3p * 100,
                        label:              "goals_4_6"
                    },
                    goals_7: {
                        matches:            response.home.away.hasum4,
                        percentage:         response.home.away.hasum4p * 100,
                        label:              "goals_7"
                    }
                }
            },
            sum: {
                number_of_matches:          response.home.total.totalgames,
                first_half_for:             response.home.total.tfhfor,
                first_half_against:         response.home.total.tfhagainst,
                second_half_for:            response.home.total.tshfor,
                second_half_against:        response.home.total.tshagainst,
                total_for:                  response.home.total.tfor,
                total_against:              response.home.total.tagainst,
                goals_pie: {
                    goals_0_1: {
                        matches:            response.home.total.tsum1,
                        percentage:         response.home.total.tsum1p * 100,
                        label:              "goals_0_1"
                    },
                    goals_2_3: {
                        matches:            response.home.total.tsum2,
                        percentage:         response.home.total.tsum2p * 100,
                        label:              "goals_2_3"
                    },
                    goals_4_6: {
                        matches:            response.home.total.tsum3,
                        percentage:         response.home.total.tsum3p * 100,
                        label:              "goals_4_6"
                    },
                    goals_7: {
                        matches:            response.home.total.tsum4,
                        percentage:         response.home.total.tsum4p * 100,
                        label:              "goals_7"
                    }
                }
            }
        };

        const result = {
            home:   home_response,
            away:   response.away
        };

        commit("saveH2H", result);
    } catch(e) {
        console.log(e.response)
    }
};

const sendGameTip = async ({ commit }, payload) => {    
    try {
        const message = `{
            "pushslip":
                ${JSON.stringify(payload)}
            
        }`;
 
        setTimeout(() =>{
            Socket.send(message);
        }, 500);
        

    } catch(e) {
        console.log(e.response);
        
    }
};

export default {
    gameInfo,
    fetch_h2h,
    sendGameTip,
};

