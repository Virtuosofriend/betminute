<?php
if (isset($_GET['u']) && isset($_GET['s'])) {
    setcookie("s_user_id", $_GET['u'], strtotime( '+90 days' ) , '/', '.bet-minute.com');
    setcookie("s_user_token", $_GET['s'], strtotime( '+90 days' ) , '/', '.bet-minute.com');
}
else {
    /* destroy the session */
    session_destroy();
    /* unset the cookies */
    unset($_COOKIE['s_user_id']);
    unset($_COOKIE['s_user_token']);
    setcookie("s_user_id", NULL, -1, '/', '.bet-minute.com');
    setcookie("s_user_token", NULL, -1, '/', '.bet-minute.com');
}