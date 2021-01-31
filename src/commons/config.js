const date = new Date();
const day = date.getDay();

export const CONFIG = {
    default_socket_timer:       (day > 0 && day < 6) ? 4 : 0,
    main_api:                   process.env.VUE_APP_baseURL || "https://bet-minute.com/service/requests",
    login_api:                  "https://bet-minute.com/api/",
    default_language:           "en",
    default_avatar:             `${process.env.BASE_URL}img/avatars/default.png`,
    default_notification_time:  5000,
    default_items_in_feed:      100
};

export default CONFIG;