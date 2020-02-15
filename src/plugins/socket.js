import Vue from "vue";
import store from '../store';

const PORT = 8080;
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
  
}

let sendWaiting = msg  => {
  waitForSocketConnection(socket, () => {
    socket.send(msg);
  });
};


const emitter = new Vue({
  store,
  methods: {

    send(message) {
      sendWaiting(message)
    },

    storeUser(data) {      
      this.$store.dispatch("user/userPrefs", data);
    },

    storeUserBanka(data) {
      this.$store.commit("user/banka", data);
    },

    storeDashboardLists(data) {
      this.$store.commit("dashboard/overgoalslists", data);
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
    return emitter.storeDashboardLists(socketResponse.data);
  }
}

socket.onerror = error => {
  console.log(error);
  
}


export default emitter