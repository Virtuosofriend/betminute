import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    game:     {},
    odds:     [],
    h2h:      {}
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
