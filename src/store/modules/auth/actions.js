import Socket from '../../../plugins/socket';
import axios from "axios";

const login = async ({ commit }, payload) => {
    try {
        (await axios.post("https://bet-minute.com/api/login.php", payload))
            .then( res => {
                console.log(res);
            });

    } catch(e) {
        console.log(e.response)
    }
};
const socketLogin = async ({ commit }, data) => {
    try {
        let message = `{
            "authenticateuser": {
                "user_id": 4,
                "token": "c54ef3978acc08279aa7f592471c11c4"
            }
        }`;
        
        localStorage.setItem("token", "c54ef3978acc08279aa7f592471c11c4");
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
    login,
    logout
  };

