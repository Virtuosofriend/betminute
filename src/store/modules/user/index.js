import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
    user: {},
    banka: {
        banka_info: {}
    }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
