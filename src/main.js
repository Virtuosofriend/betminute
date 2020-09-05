import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/flag-css.min.css';
import i18n from './plugins/i18n';
import HighchartsVue from 'highcharts-vue'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
