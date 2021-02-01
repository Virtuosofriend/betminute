const date = new Date();
const day = date.getDay();
const time = date.getHours();

const socket_response = (day, time) => {
    if ( day == 6 && time > 18 ) {
        return 4
    }
    
    if ( day > 0 && day < 6 ) {
        return 4;
    }

    return 0
};

export const CONFIG = {
    default_socket_timer:       socket_response(day, time),
    main_api:                   process.env.VUE_APP_baseURL || "https://bet-minute.com/service/requests",
    login_api:                  "https://bet-minute.com/api/",
    default_language:           "en",
    default_avatar:             `${process.env.BASE_URL}img/avatars/default.png`,
    default_notification_time:  5000,
    default_items_in_feed:      100
};

export default CONFIG;