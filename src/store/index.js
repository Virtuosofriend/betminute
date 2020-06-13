import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import feed from './modules/feed';
import game from './modules/game';

import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://www.bet-minute.com/';


export default new Vuex.Store({
  modules: {
    auth,
    feed,
    game
  },
});
