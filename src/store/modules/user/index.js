import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { CONFIG } from "../../../commons/config";

const state = {
    user:     {},
    avatar:   localStorage.getItem("bm_avatar") || CONFIG.default_avatar,
    language: localStorage.getItem("bm_lang") || CONFIG.default_language,
    banka: {
        banka_info: {}
    }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
