import Vue from "vue";
import store from "../store";
import helper from "./helper";

const PORT = 8080;
const socket = new WebSocket(`wss://dbsrv.bet-minute.com:${PORT}`);

// A little magic to make socket work properly
// Have to wait for a few ms for the connection to be live

let waitForSocketConnection = (socket, callback) => {
	if (socket.readyState != 1) {
		setTimeout(() => {
				if (socket.readyState != 1) {
					return waitForSocketConnection(socket, callback)
				}
					return callback();
			}, 5);
	}
  	return callback();
}

let sendWaiting = msg  => {
	waitForSocketConnection(socket, () => {   
		socket.send(msg);
	});
};

// To be deleted
let tmp_static = "";
//

const emitter = new Vue({
    store,
    methods: {

        send(message) { 
        sendWaiting(message);
        },

        storeUser(data) {      
        this.$store.dispatch("feed/userPrefs", data);
        },

        storeUserBanka(data) {
        this.$store.commit("feed/banka", data);
        },

        storeDashboardLists(data) {
        this.$store.commit("feed/overgoalslists", data);
        },

        storeTopTipsters(data) {
        this.$store.commit("feed/topTipsters", data);
        },

        storeLivescore(data) {
        this.$store.commit("feed/saveLivescore", data);
        },

        storeNotStarted(data) {
        this.$store.commit("feed/saveNotStarted", data);
        },

        storeFinished(data) {
        this.$store.commit("feed/saveFinished", data);
        },

        storeGame(data) {      
        this.$store.commit("game/saveGame", data);
        },
        
        storeOdds(data) {
            this.$store.commit("game/saveOdds", data);
        }
    }
})

socket.onmessage = response => { 
    let socketResponse = JSON.parse(response.data); 
        console.log(socketResponse);
    
    if ( socketResponse.action == "authenticateuser" ) {
        if ( socketResponse.data.status == "OK" ) {
        return emitter.storeUser(socketResponse.data);
        }
    }

    if ( socketResponse.action == "getusertipinfo" ) {
        return emitter.storeUserBanka(socketResponse.data);
    }

    if ( socketResponse.action == "fetchdata" ) {

        // dashboard lists
        if ( socketResponse.data.dashboard ) {
        emitter.storeDashboardLists(socketResponse.data.dashboard);
        }
        
        // top20 tipsters
        if ( socketResponse.data.top_20_tipsters ) {      
        emitter.storeTopTipsters(socketResponse.data.top_20_tipsters);
        }

        // Livescore
        if ( socketResponse.data.livescore ) {
        emitter.storeLivescore(socketResponse.data.livescore);
        }
        if ( socketResponse.data.notstarted_livescore ) {
        emitter.storeNotStarted(socketResponse.data.notstarted_livescore);
        }
        if ( socketResponse.data.finished_livescore ) {
        emitter.storeFinished(socketResponse.data.finished_livescore);
        }

        // Game Data
        
        if ( socketResponse.data.livescore_lineup ) {
    
        if ( socketResponse.data.bm_static_data != null ) {
            tmp_static = socketResponse.data.bm_static_data;
        }
        
        let obj = {
            lineup:         socketResponse.data.livescore_lineup || "",
            bm_live_data:   socketResponse.data.bm_live_data || "",
            match_stats:    socketResponse.data.match_stats || "",
            bm_static:      socketResponse.data.bm_static_data != null ? socketResponse.data.bm_static_data : null,
            textbot:        socketResponse.data.textbot != null ? helper.removeNullProperties(socketResponse.data.textbot) : null,
        };      
        emitter.storeGame(obj);
        }
        
        
        // Odds

        if ( socketResponse.data.livegame_odds || socketResponse.data.pregame_odds ) {
            const odds = socketResponse.data.livegame_odds || socketResponse.data.pregame_odds || [];

            emitter.storeOdds(odds);
        }
    }
}

socket.onerror = error => {
  console.log("Error in socket:", error);
}


export default emitter