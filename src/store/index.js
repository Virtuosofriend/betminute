import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import user from './modules/user';
import notifications from './modules/notifications';
import dashboard from './modules/dashboard';
import myFeed from './modules/myfeed';
import game from './modules/game';

import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://www.bet-minute.com/';


export default new Vuex.Store({
  modules: {
    auth,
    user,
    myFeed,
    notifications,
    dashboard,
    game
  },
});
