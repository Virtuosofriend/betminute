import moment from 'moment';
import Socket from '../../../plugins/socket'

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

const userBanka = async ({ commit }, payload) => {
    
    try {
        let message = `{
            "getusertipinfo": {
                "user_id": ${ payload.userID }
              }
        }`;
       
        Socket.send(message);
    } catch(e) {
        console.log(e);
        
    }
};

export default {
    userPrefs,
    userBanka
  };

