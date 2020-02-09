<?php
require_once "lib/AppLogic.php";
$appLogic = new AppLogic();

$user = $appLogic->check_login();
print json_encode(array('success' => isset($_SESSION['user_id']), 'user' => $user));
exit;
