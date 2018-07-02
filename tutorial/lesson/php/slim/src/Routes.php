<?php

$app = new \Slim\App;
$app->get('/hello/{name}', SampleController::class . ':index');
$app->run();