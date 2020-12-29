import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
    tipping_notification: {
        message:    "",
        status:     false,
        color:      "accent"
    },
    overlay:    false
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
