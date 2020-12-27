import Socket from "../../../plugins/socket"

const fetchUserPreferences = async ({ commit }, data) => {
    try {
        let payload = {
            preferences: data.preferences,
            paid: data.has_paid
        };

        commit("savePrefs", payload);
    } catch(e) {
        console.log(e.response);
        
    }
};

const fetchUserBank = ({ commit }) => {
    const user_ID = localStorage.getItem("userID");
    const message = 
        `{
            "getusertipinfo": {
                "user_id": ${ user_ID }
                }
            }
        `;
        
        Socket.send(message);        
};

export default {
    fetchUserBank,
    fetchUserPreferences
};