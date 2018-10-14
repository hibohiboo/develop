create database wpdb;
create user 'wpadmin'@'%' identified by 'wppassword';
grant all on wpdb.* to 'wpadmin'@'%';
