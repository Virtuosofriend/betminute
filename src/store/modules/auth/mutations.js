const session = (state, data) => {
    state.user = data;
  };
  
  const logout = (state) => {
    state.user = {
      status: "",
      token: "",
      username: ""
    };
  };
  
  export default {
    session,
    logout
  };