import Vue from "vue";
import axios from "axios";
import { API_URL } from "@/commons/config";

const ApiService = {
    init() {
        Vue.use(axios);
    },

    bet_minute() {
        return axios.create ({
            baseURL : API_URL.main,
            headers: {"Accept": "application/json"}
        });
    },

//   setHeader() {
//     Vue.axios.defaults.headers.common[
//       "Authorization"
//     ] = `Token ${JwtService.getToken()}`;
//   },
};

export default ApiService;