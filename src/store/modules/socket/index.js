import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { CONFIG } from "../../../commons/config";

const state = {
    socket: 0,
    timer:  CONFIG.default_socket_timer
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
