import Socket from '../../../plugins/socket'

const fetchLists = async ({ commit }, payload) => {    
    try {
        let message = `{
            "fetchdata":{
                "globaldata": ["dashboard", "top_20_tipsters"]
                }
            }
        `;
       
        Socket.send(message);
    } catch(e) {
        console.log(e);
        
    }
};

const fetchTopTipsters = async ({ commit }) => {
    try {
        let global_data = ["top_20_tipsters"];
        let message = `{
            "fetchdata": {
              "globaldata": ["top_20_tipsters"]
              }
            }
          `;          
          Socket.send(message);
    } catch(e) {
        console.log(e);
        
    }
};

export default {
    fetchLists,
    fetchTopTipsters
  };

