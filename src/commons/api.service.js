import Vue from "vue";
import axios from "axios";
import { CONFIG } from "@/commons/config";

const ApiService = {
    bet_minute() {
        return axios.create ({
            baseURL : CONFIG.main_api,
            headers: { "Content-Type": "application/json" }
        });
    },

//   setHeader() {
//     Vue.axios.defaults.headers.common[
//       "Authorization"
//     ] = `Token ${JwtService.getToken()}`;
//   },
};

export default ApiService;