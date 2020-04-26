import Socket from '../../../plugins/socket';

const socketLogin = async ({ commit }, data) => {
    try {
        let message = `{
            "authenticateuser": {
                "user_id": 4,
                "token": "388cb1ab904d6455ad0e705f318eecb4"
            }
        }`;
        
        localStorage.setItem("token", "388cb1ab904d6455ad0e705f318eecb4");
        localStorage.setItem("user", "Virtuosofriend");
        localStorage.setItem("userID", 4);
        commit("session", { token: "388cb1ab904d6455ad0e705f318eecb4", user: "Virtuosofriend", id: 4});    
        Socket.send(message);
        return true;
    } catch(e) {
        return false;
    }
};

const logout = ({ commit }, info) => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpires');
  };

export default {
    socketLogin,
    logout
  };

