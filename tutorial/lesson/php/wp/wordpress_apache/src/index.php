<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>サンプルアプリケーション</title>
</head>
<body>
<h1>Hello World</h1>
<h2>PHP Info</h2>
<p><a href="phpinfo.php">show phpinfo</a></p>
<h2>DataBase</h2>
<p><a href="//<?php echo $_SERVER["HTTP_HOST"];?>:8080/">adminer</a></p>
<h3>接続情報</h3>
<?php
    // 開発環境
    $host   = 'db';
    $dbname = 'wpdb';
    $username = 'wpadmin';
    $password = 'wppassword';
?>
<table>
  <tr><th>Server</th><td><?php echo $host;?></td></tr>
  <tr><th>Username</th><td><?php echo $username;?></td></tr>
  <tr><th>Pasword</th><td><?php echo $password;?></td></tr>
  <tr><th>Database</th><td><?php echo $dbname;?></td></tr>
</table>
<h2>sql実行</h2>
<?php
    $dsn = "mysql:dbname=$dbname;host=$host;charset=utf8";
    $id = 1;
    $sql = '
                 SELECT u.name,
                        r.name,
                        u.login_id,
                        u.email
                   FROM users u
             INNER JOIN roles r
                     ON u.role_id = r.id
                  WHERE u.id = :id
            ';
    try {
		  $db = new PDO($dsn, $username, $password);
      $stmt = $db->prepare($sql);
      $stmt->bindParam(':id', $id);
	  	$stmt->execute();
	  	while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        echo implode(" , ", $result);
      }
		} catch (PDOException $e) {
      echo "データベース[$dbname]に接続できませんでした。" . $e->getMessage();
		} catch(Exception $e){
      echo 'SQLの実行に失敗しました';
    }
?>
</body>
</html>