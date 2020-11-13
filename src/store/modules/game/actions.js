import Socket from '../../../plugins/socket'

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
    sendGameTip,
    gameInfo
};

