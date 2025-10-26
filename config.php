<?php
define('YOUR_APP_ID', '54268245');
define('ACCESS_TOKEN', '4b1994f84b1994f84b1994f850482585ad44b194b1994f823e5763775faa458194a571b');
define('SECRET_KEY', 'RrqpRoy2yhYV4DOEs6S1');
define('TEST_MODE', 1);

// Базовая настройка CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>