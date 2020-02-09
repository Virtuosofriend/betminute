import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  user: {
    status: "",
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('user') || ''
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
