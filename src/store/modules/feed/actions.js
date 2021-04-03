import Socket from "../../../plugins/socket"

const fetchDashboard = ({ commit }, payload) => {
    const message =
        `{
            "fetchdata":{
                "globaldata": ["dashboard", "top_20_tipsters"]
            },
            "getusertipinfo": {
                "user_id": ${ payload.id }
            }
        }`;

    Socket.send(message);
};

const fetchFeedData = async ({ commit } , payload) => {    
    try {
        const message = 
            `{
                "fetchdata":{
                    "globaldata": ["livescorev2", "upcomming", "finished_livescore", "top_20_tipsters"]
                },
                "getusertipinfo": {
                    "user_id": ${ payload.id }
                }
            }`;
        
        Socket.send(message);
        

    } catch(e) {
        return false;
    }
};

const setTipstersSelection = ({ commit }, payload) => {
    commit("saveTipsterSelection", payload);
};

const setFeedFilter = ({ commit }, payload) => {
    commit("saveFeedFilter", payload)
};

const fetchFavsFromServer = ({ commit }, payload) => {
    commit("saveFavoriteInFeed", payload);
};

const setFavoriteGame = ({ commit, state }, payload) => {
    let result = state.favorite_games_ids;

    if ( result.length > 0 ) {

        if ( !state.favorite_games_ids.some(elem => elem == payload) ) {
            result.push(payload);
            // return commit("saveFavoriteInFeed", payload);
        } else {
            const position = state.favorite_games_ids.indexOf(payload);
            result.splice(position, 1);
        }

        const message = `{
            "updateuserpreferences": {
                "favorite_games": ${JSON.stringify(result)}
            }
        }`;

        Socket.send(message);
        return commit("saveFavoriteInFeed", result);
    }

    result.push(payload);

    const message = `{
        "updateuserpreferences": {
            "favorite_games": ${JSON.stringify(result)}
        }
    }`;

    Socket.send(message);
    return commit("saveFavoriteInFeed", result);
};

export default {
    fetchDashboard,
    fetchFeedData,
    fetchFavsFromServer,
    setTipstersSelection,
    setFavoriteGame,
    setFeedFilter
};