import Socket from '../../../plugins/socket';

// u/n: admin@capeverde.com
// p/w: 123456

const socketLogin = async ({ commit }, data) => {
    try {
        // const response = (await axios.post(`/api/login.php`, 
        // {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // },
        // { ...data }));
        // console.log(response);
        
        // return response;
        let message = `{
            "authenticateuser": {
                "user_id": 4,
                "token": "388cb1ab904d6455ad0e705f318eecb4"
            }
        }`;
        
        localStorage.setItem("token", "388cb1ab904d6455ad0e705f318eecb4");
        localStorage.setItem("user", "Virtuosofriend");
        commit("session", { token: "388cb1ab904d6455ad0e705f318eecb4", user: "Virtuosofriend", userID: 4});    
        Socket.send(message);
        return true;
    } catch(e) {
        console.log(e);
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

