
<?php
try {

    // 接続
    $pdo = new PDO('sqlite:my_sqlite_db.db');

    // SQL実行時にもエラーの代わりに例外を投げるように設定
    // (毎回if文を書く必要がなくなる)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // デフォルトのフェッチモードを連想配列形式に設定 
    // (毎回PDO::FETCH_ASSOCを指定する必要が無くなる)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // テーブル作成
    $pdo->exec("CREATE TABLE IF NOT EXISTS fruit(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(10),
        price INTEGER
    )");

    // 挿入（プリペアドステートメント）
    $stmt = $pdo->prepare("INSERT INTO fruit(name, price) VALUES (?, ?)");
    foreach ([['りんご', '200'], ['バナナ', '200']] as $params) {
        $stmt->execute($params);
    }

    // 選択 (プリペアドステートメント)
    $stmt = $pdo->prepare("SELECT * FROM fruit WHERE price = ?");
    $stmt->execute(['200']);
    $r1 = $stmt->fetchAll();

    // 結果を確認
    var_dump($r1);

} catch (Exception $e) {

    echo $e->getMessage() . PHP_EOL;

}