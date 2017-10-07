<?php
  session_start();
  header('Content-Type: text/html; charset=UTF-8');
  // フォームから送信されたidを取得。
  $id  = $_POST['id'];

  // フォームから送信されたパスワードをハッシュ化
  $options = [
    'cost' => 11,
    'salt' => '固定のソルトを使ったり、ランダムではない方法で作ったソルトを使ったりしてはいけません。',
  ];
  $pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT, $options);
  
  // SQLを組み立て。
  // ※SQLインジェクション発生の脆弱性
  $sql = "SELECT * FROM users WHERE id = '$id' and pwd = '$pwd'";

  // DBに接続
  $host   = 'db';
  $dbname = 'testdb';
  $username = 'root';
  $password = 'password';

  $dsn = "mysql:dbname=$dbname;host=$host;charset=utf8";
  try {
    $db = new PDO($dsn, $username, $password);
    $result = $db->query($sql);
    $members = array();
    foreach ($result as $row) {
        $members[] = $row;
    }
  } catch (PDOException $e) {
    //exit('データベースに接続できませんでした。' . $e->getMessage());
    echo "データベース[$dbname]に接続できませんでした。" . $e->getMessage();
  } catch(Exception $e){
    echo 'SQLの実行に失敗しました';
  }
  ?>
  <html>
  <body>
  <?php
   // IDとパスワードで検索して一致するレコードがあれば登録済みユーザとみなす
   if(count($members)>0){
     $_SESSION['id'] = $id;
     echo 'ログイン成功';
   }else{
     echo 'ログイン失敗';
   }
   ?>
   </body>
</html>
