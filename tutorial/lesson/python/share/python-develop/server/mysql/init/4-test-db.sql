DROP DATABASE IF EXISTS testdb;

CREATE DATABASE IF NOT EXISTS testdb;

USE testdb;

/*==============================================================*/
/* Table: Customer                                              */
/*==============================================================*/
create table `users` (
   `id` VARCHAR(255) NOT NULL,
   `pwd` VARCHAR(255) NOT NULL,
   constraint `PK_USER` primary key (`id`)
);

/* pwd = password */
INSERT INTO `users` (`id`, `pwd`)VALUES('test', '$2y$11$5Zu65a6a44Gu44K944Or4uOxRa1QeJdXRiGHMrmDbWWIbYq2ngcqy' );
