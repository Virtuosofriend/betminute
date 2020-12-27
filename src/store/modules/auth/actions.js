import Socket from "../../../plugins/socket";

const socketLogin = async ({ commit, state }, data) => {
    try {
        let message = `{
            "authenticateuser": {
                "user_id": ${ state.user.id },
                "token": "${ state.user.token }"
            }
        }`;   
        Socket.send(message);
        return true;
    } catch(e) {
        return false;
    }
};

const logout = ({ commit }) => {
    localStorage.removeItem("bm_token");
    localStorage.removeItem("bm_user");
    localStorage.removeItem("bm_userID");
    commit("session", { token: "", user: "", id: ""});
};

export default {
    socketLogin,
    logout
};