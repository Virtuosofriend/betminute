import Vue from "vue";
import store from '../store';

const PORT = 8081;
const socket = new WebSocket(`wss://dbsrv.bet-minute.com:${PORT}`);

// A little magic to make socket work properly
// Have to wait for a few ms for the connection to be live

let waitForSocketConnection = (socket, callback) => {
   
  if (socket.readyState != 1) {
    setTimeout(
      function () {
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
    console.log(msg)
    socket.send(msg);
  });
};


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
      return emitter.storeTopTipsters(socketResponse.data.top_20_tipsters);
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
  }
}

socket.onerror = error => {
  console.log(error);
  
}


export default emitter