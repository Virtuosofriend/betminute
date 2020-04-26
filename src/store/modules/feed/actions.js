import moment from 'moment';
import Socket from '../../../plugins/socket'

const globaldata = async ({ commit } , payload) => {    
    try {
        let message = `{
            "fetchdata":{
                "globaldata": ["livescore", "notstarted_livescore", "finished_livescore", "dashboard", "top_20_tipsters"]
                }
            }
        `;

        let message2 = `{
            "getusertipinfo": {
                "user_id": ${ payload.id }
                }
            }
        `;
        Socket.send(message);

        Socket.send(message2);
    } catch(e) {
        return e.response;
    }
};

const userPrefs = async ({ commit }, data) => {
    try {
        let payload = {
            preferences: data.preferences,
            paid: data.has_paid,
            premiumUntil: moment(data.valid_until * 1000).format("DD/MM/YYYY")
        };

        commit("savePrefs", payload);
    } catch(e) {
        console.log(e);
        
    }
};

export default {
    globaldata,
    userPrefs,
  };

