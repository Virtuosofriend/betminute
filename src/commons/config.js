export const CONFIG = {
    default_socket_timer:       8,
    main_api:                   process.env.VUE_APP_baseURL || "https://bet-minute.com/service/requests",
    login_api:                  "https://bet-minute.com/api/",
    default_language:           "en",
    default_avatar:             `${process.env.BASE_URL}img/avatars/default.png`,
    default_notification_time:  5000,
    default_items_in_feed:      100
};

export default CONFIG;