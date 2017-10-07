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
  <tr><th>Database</th><td>northwind</td></tr>
</table>
<h3>セキュリティ実践</h3>
<p><a href="http://172.17.8.101/sample/login.html">SQLインジェクションによる認証回避</a></p>
<h3>ページング実践</h3>
<p><a href="http://172.17.8.101/sample/customer/index.php?limit=20&offset=0&orderField=Id&order=asc">ページングの実践</a></p>
</body>
</html>