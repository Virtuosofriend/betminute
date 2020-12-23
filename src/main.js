import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify";
import "@fortawesome/fontawesome-free/css/all.css"
import "./assets/css/flag-css.min.css";
import i18n from "./plugins/i18n";
import HighchartsVue from "highcharts-vue"
import Vuelidate from "vuelidate"
import ApiService from "./commons/api.service";

import NoDecimals from "./commons/number.filter";
import DateOnly from "./commons/date_only.filter";
import DateSmall from "./commons/date_small.filter";

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(Vuelidate);

Vue.filter("noDecimals", NoDecimals);
Vue.filter("dateOnly", DateOnly);
Vue.filter("dateSmall", DateSmall);

ApiService.init();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app")
