DROP DATABASE IF EXISTS testdb;

CREATE DATABASE IF NOT EXISTS testdb;

USE testdb;

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
( 'test', '$2y$10$t0jhM3RxVim.t4L8AoXczuMFf/jNq3AudTFiYzqUqdfdYUwp6VwN.', 'test', 'test@sample.co.jp', 2, '2016-06-13 18:05:45');



-- 権限データ追加
INSERT INTO `testdb`.`roles` ( `name`) VALUES ( '一般');
INSERT INTO `testdb`.`roles` ( `name`) VALUES ( '管理者');