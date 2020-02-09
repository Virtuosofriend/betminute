<?php
header("Access-Control-Allow-Origin: *");
require_once "lib/AppLogic.php";
$appLogic = new AppLogic();

$data = json_decode(file_get_contents('php://input'));

if (!empty($data->name) && !empty($data->pass)) {
    try {
        $user = $appLogic->sign_in($data->name, $data->pass);
        print json_encode(array('success' => true, 'user' => $user));
        exit;
    } catch (Exception $e) {
        print json_encode( array('success' => false, 'message' => $e->getMessage()) );
        exit;
    }
}
