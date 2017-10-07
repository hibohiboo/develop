<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>サンプルアプリケーション</title>
<style>
  article, aside, dialog, figure, footer, header,
  hgroup, menu, nav, section { display: block; }
</style>
</head>
<body>
<h1>Hello World</h1>
<h2>PHP Info</h2>
<p><a href="phpinfo.php">show phpinfo</a></p>
<h2>DataBase</h2>
<p><a href="http://172.17.8.101:8080/">adminer</a></p>
<h3>接続情報</h3>
<table>
  <tr><th>Server</th><td>db</td></tr>
  <tr><th>Username</th><td>root</td></tr>
  <tr><th>Pasword</th><td>password</td></tr>
  <tr><th>Database</th><td>mysql</td></tr>
</table>
<h3>データベース接続テスト</h3>
<h4>接続テストSQL</h4>
<?php
		$sql = '
                 SELECT u.name,
                        r.name,
                        u.login_id,
                        u.email
                   FROM users u
             INNER JOIN roles r
                     ON u.role_id = r.id
            ';
?>
<pre><?=$sql?></pre>
<h4>実行結果</h4>
<?php
		// 開発環境
		$host   = 'db';
		$dbname = 'testdb';
		$username = 'root';
		$password = 'password';

		$dsn = "mysql:dbname=$dbname;host=$host;charset=utf8";
		try {
		  $db = new PDO($dsn, $username, $password);
  		$stmt = $db->prepare($sql);
	  	$stmt->execute( array($id) );
	  	while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        echo implode(" , ", $result);
      }
		} catch (PDOException $e) {
		  //exit('データベースに接続できませんでした。' . $e->getMessage());
      echo "データベース[$dbname]に接続できませんでした。" . $e->getMessage();
		} catch(Exception $e){
      echo 'SQLの実行に失敗しました';
    }
?>

<h4>DDL</h4>
<p>Adminerにログイン → SQL commandに以下のSQLを入力してexecute</p>
<p>もう一度このページに戻って確認してみること。</p>
<pre>
-- データベース作成
CREATE DATABASE testdb CHARACTER SET utf8;

-- ユーザテーブル作成
CREATE TABLE IF NOT EXISTS `testdb`.`users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `login_id` varchar(256) NOT NULL COMMENT 'ログインID',
  `pwd` varchar(256) NOT NULL COMMENT 'パスワード',
  `name` varchar(256) NOT NULL COMMENT '名前',
  `email` varchar(256) NOT NULL,
  `role_id` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1:一般利用者 2:管理者',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日時',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 権限テーブル作成
CREATE TABLE IF NOT EXISTS `testdb`.`roles` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(256) NOT NULL COMMENT '名前',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


-- ユーザデータ追加
INSERT INTO `testdb`.`users` ( `login_id`, `pwd`, `name`, `email`, `role_id`, `create_date`) VALUES
( 'test', '$2y$10$t0jhM3RxVim.t4L8AoXczuMFf/jNq3AudTFiYzqUqdfdYUwp6VwN.', 'test', 'test@gsoft.co.jp', 2, '2016-06-13 18:05:45');



-- 権限データ追加
INSERT INTO `testdb`.`roles` ( `name`) VALUES ( '一般');
INSERT INTO `testdb`.`roles` ( `name`) VALUES ( '管理者');
</pre>
</body>
</html>