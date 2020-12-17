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
import axios from "axios"
import moment from "moment";

import NoDecimals from "./commons/number.filter";

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(Vuelidate);

/**  Axios configuration **/
axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

// axios.defaults.baseURL = "https://staging.api.microproducer.draxis.gr/";
axios.defaults.baseURL = process.env.VUE_APP_baseURL || "https://bet-minute.com/service/requests";
/** End of config **/

Vue.filter("noDecimals", NoDecimals);

Vue.filter("dateOnly", value => {
    if (!value){
        return ""
    }

    return moment(value).format("DD-MM-YYYY");
});

Vue.filter("dateSmall", value => {
    if (!value){
        return ""
    }

    return moment(value).format("DD-MM");
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  axios,
  render: h => h(App)
}).$mount("#app")
