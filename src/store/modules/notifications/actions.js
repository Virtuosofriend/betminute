
const sendNotification = async ({ commit }, payload) => {
    try {
        commit('sendNotification', payload.message);
    } catch(e) {
        console.log(e); 
    }
};

const dialogDetails = async ({commit}, payload) => {
    try {
        commit("dialog", payload);
    } catch(e) {
        console.log(e);
        
    }
};


export default {
    sendNotification,
    dialogDetails
};