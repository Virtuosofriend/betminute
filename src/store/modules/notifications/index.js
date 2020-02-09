import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  notifications: {
    status: false,
    color: "#18b0C4",
    message: ""
  },
  dialog: {
    status: false,
    action: null,
    data: null
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
