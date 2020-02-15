import moment from 'moment';
import Socket from '../../../plugins/socket'

const fetchLists = async ({ commi }, payload) => {    
    try {
        let message = `{
            "fetchdata":{
                "globaldata": ["dashboard"]
                }
            }
        `;
       
        Socket.send(message);
    } catch(e) {
        console.log(e);
        
    }
};

export default {
    fetchLists
  };

