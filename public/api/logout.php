<?php
require_once "lib/AppLogic.php";
$appLogic = new AppLogic();

$appLogic->sign_out();
print json_encode(array('success' => true));
exit;
