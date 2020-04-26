import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  user: {
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('user') || '',
    id: localStorage.getItem('userID') || ''
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
