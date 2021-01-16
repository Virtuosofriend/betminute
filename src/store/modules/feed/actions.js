import Socket from "../../../plugins/socket"

const fetchDashboard = ({ commit }, payload) => {
    const message = [
        `{
            "fetchdata":{
                "globaldata": ["dashboard", "top_20_tipsters"]
                }
            }
        `,
        `{
            "getusertipinfo": {
                "user_id": ${ payload.id }
                }
            }
        `
    ];

    for (let i =0; i < message.length; i++) {
        Socket.send(message[i]);
    }
};

const fetchFeedData = async ({ commit } , payload) => {    
    try {
        const message = [
            `{
                "fetchdata":{
                    "globaldata": ["livescorev2", "upcomming", "finished_livescore", "top_20_tipsters"]
                    }
                }
            `,
            `{
                "getusertipinfo": {
                    "user_id": ${ payload.id }
                    }
                }
            `
        ];

        for (let i =0; i < message.length; i++) {
            Socket.send(message[i]);
        }

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

export default {
    fetchDashboard,
    fetchFeedData,
    setTipstersSelection,
    setFeedFilter
};