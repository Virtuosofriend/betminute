import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/flag-css.min.css';
import i18n from './plugins/i18n';
import HighchartsVue from 'highcharts-vue'

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
