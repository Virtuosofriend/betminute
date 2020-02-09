<?php
ini_set('memory_limit','1024M');
ini_set('default_charset', 'UTF-8');

session_start();

// connection on ber-minute database
class PostgreSQL
{
    // params for connect to dev bet-minute database (MODIFY THIS)
    private $_dbHostname = 'dbsrv.bet-minute.com';
    private $_dbPort     = 5432;
    private $_dbUsername = 'postgres';
    private $_dbPassword = '2parrNeC9iS5uUuqTj';
    private $_database   = 'bet-minute';
    public $dbSchema     = '"user".'; // schema + dot, i.e. 'tmpdb.'

    // local environments
//    private $_dbHostname = '192.168.0.109';
//    private $_dbPort     = 5432;
//    private $_dbUsername = 'dbmain';
//    private $_dbPassword = 'dbmainpass';
//    private $_database   = 'bet-minute';
//    public $dbSchema     = '"user".'; // schema + dot, i.e. 'tmpdb.'

    // db connection, bet-minute
    private static $_dbCon = null;

    public function __construct()
    {
        if (self::$_dbCon === null) {
            if ((self::$_dbCon = pg_connect("host={$this->_dbHostname} port={$this->_dbPort} dbname={$this->_database} user={$this->_dbUsername} password={$this->_dbPassword} options='--client_encoding=UTF8'")) == false) {
                error_log("CRITICAL: " . __METHOD__ . "() Can't connect to database! [error: " . pg_last_error() . "]");
                throw new Exception("Can't connect to database!");
            }

            if (pg_set_client_encoding(self::$_dbCon, 'UTF8') === -1) {
                error_log("CRITICAL: " . __METHOD__ . "() Can't loading database character set! [error: " . pg_last_error(self::$_dbCon) . "]");
                throw new Exception("Can't loading database character set!");
            }
        }
    }

    public function query($sql)
    {
//        error_log($sql);

        if ((($result = @pg_query(self::$_dbCon, $sql)) !== false) && ($result !== null))
            return ($result);
        else
            throw new Exception("An error occurred while writing to database. Please try again later");
    }

    public function toDbString($value)
    {
        return ("'" . pg_escape_string(self::$_dbCon, $value) . "'");
    }

    public function toDbInteger($value)
    {
        return (intval($value));
    }
}

// connection on socialtipsters database
class MariaDB
{
    // params for connect to database (MODIFY THIS)
    private $_dbHostname = 'socialtipsters.com';
    private $_dbUsername = 'socialtipsters';
    private $_dbPassword = '2parrNeC9iS5uUuqTj';
    private $_database   = 'socialtipsters';

    // local environments
//    private $_dbHostname = '192.168.0.109';
//    private $_dbUsername = 'dbmain';
//    private $_dbPassword = 'dbmainpass';
//    private $_database   = 'socialtipsters';

    // db connection
    private static $_dbCon = null;

    public function __construct()
    {
        if (self::$_dbCon === null) {
            if ((self::$_dbCon = mysqli_connect($this->_dbHostname, $this->_dbUsername, $this->_dbPassword)) == false) {
                error_log("CRITICAL: " . __METHOD__ . "() Can't connect to database! [error: " . mysqli_connect_error() . "]");
                throw new Exception("Can't connect to database!");
            }

            if (!mysqli_set_charset(self::$_dbCon, 'utf8')) {
                error_log("CRITICAL: " . __METHOD__ . "() Can't loading database character set! " .
                          "[error: " . mysqli_error(self::$_dbCon) . "]");

                throw new Exception("Can't loading database character set!");
            }

            if (@mysqli_select_db(self::$_dbCon, $this->_database) == false) {
                error_log("CRITICAL: " . __METHOD__ . "() Unable to select database! " .
                          "[error: " . mysqli_error(self::$_dbCon) . "]");

                throw new Exception("Unable to select database!");
            }
        }
    }

    public function query($sql)
    {
        error_log($sql);

        if ((($result = @mysqli_query(self::$_dbCon, $sql)) !== false) && ($result !== null))
            return ($result);
        else
            throw new Exception("An error occurred while writing to database. Please try again later");
    }

    /**
     * Convert value to db safe string
     *
     * @param $value
     * @return string
     */
    public function toDbString($value)
    {
        return ("'" . mysqli_real_escape_string(self::$_dbCon, $value) . "'");
    }

    public function toDbInteger($value)
    {
        return (intval($value));
    }
}

class AppLogic
{
    private $_dbBetMinute = null;
    private $_dbSocialTipsters = null;

    public function __construct()
    {
        $this->_dbBetMinute = new PostgreSQL();
        $this->_dbSocialTipsters = new MariaDB();

//        $this->check_login();
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    public function check_login()
    {
        if (isset($_COOKIE['s_user_id']) && isset($_COOKIE['s_user_token'])) {
            $query = $this->_dbBetMinute->query(sprintf("SELECT user_id FROM {$this->_dbBetMinute->dbSchema}\"user\" INNER JOIN {$this->_dbBetMinute->dbSchema}\"user_session\" USING (user_id) WHERE (user_id = %s) AND (session_token = %s)", $this->_dbBetMinute->toDbInteger($_COOKIE['s_user_id']), $this->_dbBetMinute->toDbString($_COOKIE['s_user_token'])));

            if (pg_num_rows($query) > 0) {
                $user = pg_fetch_assoc($query);
                $_SESSION['user_id'] = $user['user_id'];

                return $this->get_user();
            }
            else {
                unset($_SESSION['user_id']);
                $this->sign_out();
            }
        }
        else {
            unset($_SESSION['user_id']);
            $this->sign_out();
        }

        return false;
    }

    public function sign_out()
    {
        /* delete the session */
        if(isset($_COOKIE['s_user_id']) && isset($_COOKIE['s_user_token'])) {
            $this->_dbBetMinute->query(sprintf("DELETE FROM {$this->_dbBetMinute->dbSchema}\"user_session\" WHERE session_token = %s AND user_id = %s", $this->_dbBetMinute->toDbString($_COOKIE['s_user_token']), $this->_dbBetMinute->toDbInteger($_COOKIE['s_user_id'])));

            // socialtipsters logout
            $this->sign_out_st($_COOKIE['s_user_id'], $_COOKIE['s_user_token']);
        }
        /* destroy the session */
        session_destroy();
        session_commit();

        /* unset the cookies */
        unset($_COOKIE['s_user_id']);
        unset($_COOKIE['s_user_token']);
        setcookie('s_user_id', NULL, -1, '/', 'localhost');
        setcookie('s_user_token', NULL, -1, '/', 'localhost');
    }

    public function sign_in($username_email, $password, $remember = false)
    {
        /* valid inputs */
        if ($this->is_empty($username_email) || $this->is_empty($password)) {
            throw new Exception("You must fill in all of the fields");
        }
        /* check if username or email */
        if ($this->valid_email($username_email)) {
            $user = $this->check_email($username_email, true);
            if ($user === false) {
                throw new Exception("The email you entered does not belong to any account");
            }
            $field = "user_email";
        } else {
            if (!$this->valid_username($username_email)) {
                throw new Exception("Please enter a valid email address or username");
            }
            $user = $this->check_username($username_email, true);
            if ($user === false) {
                throw new Exception("The username you entered does not belong to any account");
            }
            $field = "user_name";
        }
        /* check password */
        if (!password_verify($password, $user['user_password'])) {
            throw new Exception("<p><strong>Please re-enter your password</strong></p><p>The password you entered is incorrect. If you forgot your password? <a href='https://socialtipsters.com/reset' target='_blank'>Request a new one</a></p>");
        }

        /* set cookies */
        $this->set_cookies($user['user_id'], $remember);

        return $this->get_user();
    }

    private function set_cookies($user_id, $remember = false)
    {
        $session_token = $this->get_hash_token();
        setcookie("s_user_id", $user_id, strtotime( '+90 days' ) , '/', 'localhost');
        setcookie("s_user_token", $session_token, strtotime( '+90 days' ) , '/', 'localhost');

        $date = date("Y-m-d H:i:s");

        /* insert user token */
        $this->_dbBetMinute->query(sprintf("INSERT INTO {$this->_dbBetMinute->dbSchema}\"user_session\" (session_token, session_date, user_id, user_browser, user_os, user_ip) VALUES (%s, %s, %s, %s, %s, %s)", $this->_dbBetMinute->toDbString($session_token), $this->_dbBetMinute->toDbString($date), $this->_dbBetMinute->toDbInteger($user_id), $this->_dbBetMinute->toDbString($this->get_user_browser()), $this->_dbBetMinute->toDbString($this->get_user_os()), $this->_dbBetMinute->toDbString($this->get_user_ip()) ));
        /* update last login time */
        $this->_dbBetMinute->query(sprintf("UPDATE {$this->_dbBetMinute->dbSchema}\"user\" SET user_last_login = %s WHERE user_id = %s", $this->_dbBetMinute->toDbString($date), $this->_dbBetMinute->toDbInteger($user_id) ));

        $_SESSION['user_id'] = $user_id;

        // socialtipsters login
        $this->sign_in_st($user_id, $session_token);
    }

    public function is_empty($value)
    {
        if (strlen(trim(preg_replace('/\xc2\xa0/', ' ', $value))) == 0) {
            return true;
        } else {
            return false;
        }
    }

    public function valid_email($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
            return true;
        } else {
            return false;
        }
    }

    public function check_email($email, $return_info = false)
    {
        $query = $this->_dbBetMinute->query(sprintf("SELECT * FROM {$this->_dbBetMinute->dbSchema}\"user\" WHERE user_email = %s", $this->_dbBetMinute->toDbString($email)));

        if (pg_num_rows($query) > 0) {
            if ($return_info) {
                $info = pg_fetch_assoc($query);
                return $info;
            }
            return true;
        }
        return false;
    }

    public function valid_username($username)
    {
        if (strlen($username) >= 3 && preg_match('/^[a-zA-Z0-9]+([_|.]?[a-zA-Z0-9])*$/', $username)) {
            return true;
        } else {
            return false;
        }
    }

    public function check_username($username, $return_info = false)
    {
        $query = $this->_dbBetMinute->query(sprintf("SELECT * FROM {$this->_dbBetMinute->dbSchema}\"user\" WHERE user_name = %s", $this->_dbBetMinute->toDbString($username)));

        if (pg_num_rows($query) > 0) {
            if ($return_info) {
                $info = pg_fetch_assoc($query);
                return $info;
            }
            return true;
        }
        return false;
    }

    public function get_hash_token() {
        return md5(time()*rand(1, 9999));
    }

    public function get_user_ip() {
        /* handle CloudFlare IP addresses */
        return (isset($_SERVER["HTTP_CF_CONNECTING_IP"])?$_SERVER["HTTP_CF_CONNECTING_IP"]:$_SERVER['REMOTE_ADDR']);
    }


    public function get_user_os() {
        $os_platform = "Unknown OS Platform";
        $os_array = array(
            '/windows nt 10/i'      =>  'Windows 10',
            '/windows nt 6.3/i'     =>  'Windows 8.1',
            '/windows nt 6.2/i'     =>  'Windows 8',
            '/windows nt 6.1/i'     =>  'Windows 7',
            '/windows nt 6.0/i'     =>  'Windows Vista',
            '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
            '/windows nt 5.1/i'     =>  'Windows XP',
            '/windows xp/i'         =>  'Windows XP',
            '/windows nt 5.0/i'     =>  'Windows 2000',
            '/windows me/i'         =>  'Windows ME',
            '/win98/i'              =>  'Windows 98',
            '/win95/i'              =>  'Windows 95',
            '/win16/i'              =>  'Windows 3.11',
            '/macintosh|mac os x/i' =>  'Mac OS X',
            '/mac_powerpc/i'        =>  'Mac OS 9',
            '/linux/i'              =>  'Linux',
            '/ubuntu/i'             =>  'Ubuntu',
            '/iphone/i'             =>  'iPhone',
            '/ipod/i'               =>  'iPod',
            '/ipad/i'               =>  'iPad',
            '/android/i'            =>  'Android',
            '/blackberry/i'         =>  'BlackBerry',
            '/webos/i'              =>  'Mobile'
        );
        foreach($os_array as $regex => $value) {
            if(preg_match($regex, $_SERVER['HTTP_USER_AGENT'])) {
                $os_platform = $value;
            }
        }
        return $os_platform;
    }

    public function get_user_browser() {
        $browser = "Unknown Browser";
        $browser_array = array(
            '/msie/i'       =>  'Internet Explorer',
            '/firefox/i'    =>  'Firefox',
            '/safari/i'     =>  'Safari',
            '/chrome/i'     =>  'Chrome',
            '/edge/i'       =>  'Edge',
            '/opera/i'      =>  'Opera',
            '/netscape/i'   =>  'Netscape',
            '/maxthon/i'    =>  'Maxthon',
            '/konqueror/i'  =>  'Konqueror',
            '/mobile/i'     =>  'Handheld Browser'
        );
        foreach($browser_array as $regex => $value) {
            if(preg_match($regex, $_SERVER['HTTP_USER_AGENT'])) {
                $browser = $value;
            }
        }
        return $browser;
    }

    public function get_user()
    {
        $query = $this->_dbBetMinute
            ->query(sprintf("SELECT
                                user_id,
                                user_name,
                                user_firstname,
                                user_lastname,
                                CASE WHEN ((user_picture IS NULL) OR (user_picture = '')) THEN '' ELSE CONCAT('https://socialtipsters.com/content/uploads/', user_picture) END AS user_picture,
                                user_verified
                            FROM
                                {$this->_dbBetMinute->dbSchema}\"user\"
                            WHERE
                                user_id = %s", $this->_dbBetMinute->toDbInteger($_SESSION['user_id'])));

        if (pg_num_rows($query) > 0) {
            $user = pg_fetch_assoc($query);

            // Chatroll Single Sign-On (SSO) Parameters
            $uid = $user['user_id'];                                          // Current user id
            $uname = $user['user_name'];                                      // Current user full name / username
            $ulink = "https://socialtipsters.com/{$uname}";                   //'https://www.facebook.com/BetMinute/';   // Current user profile URL (leave blank for none)
            $upic = $user['user_picture'];                                    // Current user profile picture URL (leave blank for none)
            $ismod = ($user['user_verified'] ? 1 : 0);                        // Is current user a moderator?
            $sig = md5($uid . $uname . $ismod . '53tehegx3sxbiehr');
            $ssoParams = '&uid=' . $uid . "&uname=" . urlencode($uname) . "&ulink=" . urlencode($ulink) . "&upic=" . urlencode($upic) . "&ismod=" . $ismod . "&sig=" . $sig;
            $user['user_chatroll'] = "https://chatroll.com/embed/chat/bet-minute-chat?id=33zBP89zWwW&platform=php{$ssoParams}";
            unset($user['user_verified']);

            return $user;
        }
        return false;
    }

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    /**
     * Socialtipsters auto sign-in / sign-out
     */

    private function sign_in_st($user_id, $session_token) {
        $date = date("Y-m-d H:i:s");

        /* insert user token */
        $this->_dbSocialTipsters->query(sprintf("INSERT INTO users_sessions (session_token, session_date, user_id, user_browser, user_os, user_ip) VALUES (%s, %s, %s, %s, %s, %s)", $this->_dbSocialTipsters->toDbString($session_token), $this->_dbSocialTipsters->toDbString($date), $this->_dbSocialTipsters->toDbInteger($user_id, 'int'), $this->_dbSocialTipsters->toDbString($this->get_user_browser()), $this->_dbSocialTipsters->toDbString($this->get_user_os()), $this->_dbSocialTipsters->toDbString($this->get_user_ip()) ));
        /* update last login time */
        $this->_dbSocialTipsters->query(sprintf("UPDATE users SET user_last_login = %s WHERE user_id = %s", $this->_dbSocialTipsters->toDbString($date), $this->_dbSocialTipsters->toDbInteger($user_id, 'int') ));
    }

    private function sign_out_st($user_id, $session_token) {
        $this->_dbSocialTipsters->query(sprintf("DELETE FROM users_sessions WHERE session_token = %s AND user_id = %s", $this->_dbSocialTipsters->toDbString($session_token), $this->_dbSocialTipsters->toDbInteger($user_id, 'int') ));
    }
}
