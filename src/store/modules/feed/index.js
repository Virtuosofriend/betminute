import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
    listsOver0_5ht: { open:[] },
    listsOver0_5secondhalf: { open:[] },
    listsOver1_5ft: { open:[] },
    topTipsters: {},
    top_tipsters_selection: "win_ratio",
    user: {},
    banka: {
        banka_info: {}
    },
    livescore: [],
    notStarted: [],
    finished: []
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};