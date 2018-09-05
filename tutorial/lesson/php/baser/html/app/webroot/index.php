<?php
/**
 * The Front Controller for handling every request
 *
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @package       app.webroot
 * @since         CakePHP(tm) v 0.2.9
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */
// CUSTOMIZE ADD 2012/10/27 ryuring
// >>>
/**
 * 実行ファイル名を取得する
 */
$fileName = $_SERVER['SCRIPT_FILENAME'];
/**
 * タイムゾーンを設定する
 */
ini_set('date.timezone', 'Asia/Tokyo');
@putenv("TZ=JST-9");
// <<<
/**
 * Use the DS to separate the directories in other defines
 */
if (!defined('DS')) {
	define('DS', DIRECTORY_SEPARATOR);
}

// CUSTOMIZE ADD 2016/08/30 katokaisya
// >>>
$fileName = str_replace('/', DS, $fileName);
// <<<

/**
 * These defines should only be edited if you have CakePHP installed in
 * a directory layout other than the way it is distributed.
 * When using custom settings be sure to use the DS and do not add a trailing DS.
 */

/**
 * The full path to the directory which holds "app", WITHOUT a trailing DS.
 */
if (!defined('ROOT')) {
	// CUSTOMIZE MODIFY 2012/10/27 ryuring
	// 基本的には、cake が配置されているディレクトリをROOTとみなす。
	// >>>
	//define('ROOT', dirname(dirname(dirname(__FILE__))));
	// ---

	/* 通常パターン */
	if (@is_dir(dirname(dirname(dirname($fileName))) . DS . 'lib' . DS . 'Cake')) {
		define('ROOT', dirname(dirname(dirname($fileName))));
	// app内にcakeを配置
	// チカッパでは、DocumentoRoot のひとつ上の階層にcake を配置していた為、
	// そちらをターゲットとして ROOT を決定した為、うまく動作しなかった。
	/*}elseif(is_dir(dirname(dirname($fileName)).DS.'cake')){
		define('ROOT', dirname(dirname($fileName)));*/

	// WEBROOT配置
	} elseif (is_dir(dirname($fileName) . DS . 'lib' . DS . 'Cake')) {
		define('ROOT', dirname($fileName));
	}
	// <<<
}

/**
 * The actual directory name for the "app".
 */
if (!defined('APP_DIR')) {
	// CUSTOMIZE MODIFY 2012/10/27 ryuring
	// app ディレクトリは「WEBROOT配置」の絡みがあるので[app]固定とする
	// app ディレクトリの名称を変更する場合は、以下を変更する。
	// >>>
	//define('APP_DIR', basename(dirname(dirname(__FILE__))));
	// ---
	define('APP_DIR', 'app');
	// <<<
}

/**
 * The absolute path to the "cake" directory, WITHOUT a trailing DS.
 *
 * Un-comment this line to specify a fixed path to CakePHP.
 * This should point at the directory containing `Cake`.
 *
 * For ease of development CakePHP uses PHP's include_path. If you
 * cannot modify your include_path set this value.
 *
 * Leaving this constant undefined will result in it being defined in Cake/bootstrap.php
 *
 * The following line differs from its sibling
 * /lib/Cake/Console/Templates/skel/webroot/index.php
 */
//define('CAKE_CORE_INCLUDE_PATH', ROOT . DS . 'lib');

/**
 * This auto-detects CakePHP as a composer installed library.
 * You may remove this if you are not planning to use composer (not recommended, though).
 */
$vendorPath = ROOT . DS . APP_DIR . DS . 'Vendor' . DS . 'cakephp' . DS . 'cakephp' . DS . 'lib';
$dispatcher = 'Cake' . DS . 'Console' . DS . 'ShellDispatcher.php';
if (!defined('CAKE_CORE_INCLUDE_PATH') && file_exists($vendorPath . DS . $dispatcher)) {
	define('CAKE_CORE_INCLUDE_PATH', $vendorPath);
}

/**
 * Editing below this line should NOT be necessary.
 * Change at your own risk.
 */
if (!defined('WEBROOT_DIR')) {
	// CUSTOMIZE MODIFY 2014/03/23 ryuring
	// webroot 配置の絡みがあるので webroot 固定とする
	// >>>
	//define('WEBROOT_DIR', basename(dirname(__FILE__)));
	// ---
	define('WEBROOT_DIR', 'webroot');
	// <<<
}
if (!defined('WWW_ROOT')) {
	// CUSTOMIZE MODIFY 201X/XX/XX ryuring
	// >>>
	//define('WWW_ROOT', dirname(__FILE__) . DS);
	// ---
	define('WWW_ROOT', dirname($fileName) . DS);
	// <<<
}

// For the built-in server
if (PHP_SAPI === 'cli-server') {
	if ($_SERVER['PHP_SELF'] !== '/' . basename(__FILE__) && file_exists(WWW_ROOT . $_SERVER['PHP_SELF'])) {
		return false;
	}
	$_SERVER['PHP_SELF'] = '/' . basename(__FILE__);
}

if (!defined('CAKE_CORE_INCLUDE_PATH')) {
	if (function_exists('ini_set')) {
		ini_set('include_path', ROOT . DS . 'lib' . PATH_SEPARATOR . ini_get('include_path'));
	}
	if (!include 'Cake' . DS . 'bootstrap.php') {
		$failed = true;
	}
} elseif (!include CAKE_CORE_INCLUDE_PATH . DS . 'Cake' . DS . 'bootstrap.php') {
	$failed = true;
}
if (!empty($failed)) {
	trigger_error("CakePHP core could not be found. Check the value of CAKE_CORE_INCLUDE_PATH in APP/webroot/index.php. It should point to the directory containing your " . DS . "cake core directory and your " . DS . "vendors root directory.", E_USER_ERROR);
}

App::uses('Dispatcher', 'Routing');

$Dispatcher = new Dispatcher();
$Dispatcher->dispatch(
	new CakeRequest(),
	new CakeResponse()
);
