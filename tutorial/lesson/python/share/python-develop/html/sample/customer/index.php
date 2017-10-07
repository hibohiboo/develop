<?php
  header('Content-Type: text/html; charset=UTF-8');
  $offset     = $_GET['offset'];
  $limit      = $_GET['limit'];
  $orderField = $_GET['orderField'];
  $order      = $_GET['order'];
  $searchField = $_GET['searchField'];
  $searchValue = $_GET['searchValue'];

  // 全てのレコード数を取得
  // TODO: 課題1． テーブルの総数を数える。 総数にはTotalというエイリアスを付ける。
  $sql = "";
  $list = executeSQL($sql);

  if(!empty($list)){
    $totalCount = $list[0]["Total"];
  }

  $filteredTotalCount = $totalCount;
  
  // TODO: 課題2. Customerの表を取得する。
  $sql = " ";

  // TODO: 課題3. ソートを行う。  
  if(!empty($order)){
    $sql .= "  ";
  }

  // TODO: 課題4. 1ページあたりの表示数分のみ取得する。
  // TODO: 課題5. オフセットをつけて取得する。
  if(!empty($limit)){
    $sql .= " ";
  }
  $list = executeSQL($sql);
  
  $columns = executeSQL('show columns from Customer');

  ?>
  <html>
  <body>
    <h1>実習：ページング</h1>
    <h2> データベース情報</h2>
    <table>
      <tr><th>データベース</th><td>northwind</td></tr>
      <tr><th>テーブル</th><td>Customer</td></tr>
    </table>
    <h2>テーブル情報</h2>
    <table>
      <tr><th>総数</th>                     <td><?php echo $totalCount; ?></td></tr>
      <tr><th>絞りこみ後の総数</th>         <td><?php echo $filteredTotalCount ?></td></tr>
      <tr><th>1ページあたりの表示件数</th>  <td><?php echo $limit; ?></td></tr>
      <tr><th>ソート順</th>                 <td><?php echo $orderField . ' ' . $order; ?></td></tr>
      <tr><th>何行目から表示するか</th>     <td><?php echo $offset; ?></td></tr>
    </table>
    
    <h2>検索結果</h2>
    <table>
      <tr>
        <?php foreach($columns as $column):?>
          <th><?php echo $column['Field']?></th>
        <?php endforeach?>
      </tr>
      <?php foreach($list as $item):?>
        <tr>
          <?php foreach($columns as $column):?>
            <td><?php echo $item[$column['Field']]?></td>
          <?php endforeach?>
        </tr>
      <?php endforeach?>
    </table>
   </body>
</html>

<?php
  /**
  * SQLを実行して結果を取得する。
  * $sql SQL
  * return SQL実行結果の配列
  */
  function executeSQL($sql)
  {
    // 空の配列を返す。
    if(empty(trim($sql))){
      return array();
    }

    $members = array();
    

    // 接続情報
    $host   = 'db';
    $dbname = 'northwind';
    $username = 'root';
    $password = 'password';

    $dsn = "mysql:dbname=$dbname;host=$host;charset=utf8";
    try {
      $db = new PDO($dsn, $username, $password);
      $result = $db->query($sql);

      // dbから取得した結果をリストに入れる
      foreach ($result as $row) {
          $members[] = $row;
      }
    } catch (PDOException $e) {
      //exit('データベースに接続できませんでした。' . $e->getMessage());
      echo "データベース[$dbname]に接続できませんでした。" . $e->getMessage();
    } catch(Exception $e){
      echo 'SQLの実行に失敗しました';
    }

    return $members;
  }