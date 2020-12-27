import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth";
import feed from "./modules/feed";
import game from "./modules/game";
import user from "./modules/user";
import socket from "./modules/socket";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        feed,
        game,
        user,
        socket
    }
});
