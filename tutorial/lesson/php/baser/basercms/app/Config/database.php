<?php
//
// Database Configuration File created by baserCMS Installation
//
class DATABASE_CONFIG {
public $default = array(
	'datasource' => 'Database/BcSqlite',
	'persistent' => false,
	'host' => 'localhost',
	'port' => '3306',
	'login' => '',
	'password' => '',
	'database' => '/var/www/html/app/db/sqlite/basercms.db',
	'schema' => '',
	'prefix' => '',
	'encoding' => 'utf8'
);
public $test = array(
	'datasource' => 'Database/BcSqlite',
	'persistent' => false,
	'host' => 'localhost',
	'port' => '3306',
	'login' => '',
	'password' => '',
	'database' => '/var/www/html/app/db/sqlite/basercms.db',
	'schema' => '',
	'prefix' => 'test_',
	'encoding' => 'utf8'
);
}
