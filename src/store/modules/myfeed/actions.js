import Socket from '../../../plugins/socket'

const fetchLivescore = async ({ commit }, payload) => {    
    try {
        let message = `{
            "fetchdata":{
                "globaldata": ["new_livescore"]
                }
            }
        `;       
        Socket.send(message);
    } catch(e) {
        console.log(e);
        
    }
};


export default {
    fetchLivescore
};

