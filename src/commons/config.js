export const CONFIG = {
    default_socket_timer:   15,
    main_api:               process.env.VUE_APP_baseURL || "https://bet-minute.com/service/requests",
    login_api:              "https://bet-minute.com/api/",
    default_language:       "en"
};

export default CONFIG;