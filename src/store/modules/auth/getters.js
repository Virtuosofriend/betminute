const isLoggedIn = state => !!state.user.token;
const authStatus = state => state.user.status;
const userInformation = state => state.user;


export default {
  isLoggedIn,
  authStatus,
  userInformation
};