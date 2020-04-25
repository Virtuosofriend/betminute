import Socket from '../../../plugins/socket'

const fetchLivescore = async ({ commit }, payload) => {    
    try {
        let message = `{
            "fetchdata":{
                "globaldata": ["livescore", "notstarted_livescore", "finished_livescore"]
                }
            }
        `;       
        // Socket.send(message);
    } catch(e) {
        console.log(e.response);
        
    }
};


export default {
    fetchLivescore
};

