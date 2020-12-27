import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    user: {
        token:      localStorage.getItem("bm_token") || "",
        username:   localStorage.getItem("bm_user") || "",
        id:         localStorage.getItem("bm_userID") || "",
        user_pic:   localStorage.getItem("bm_avatar") || `${process.env.BASE_URL}img/avatars/default.png`
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
