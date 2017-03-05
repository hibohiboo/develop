
/** 
 * 今回はdbフォルダの下に「demo.sqlite3」というファイル（データベース）をつくる。 
 *  拡張子は何でもよい。以下のような拡張子が多い。
 * 「*.sqlite3」
 * 「*.db」
 * 「*.database」 
 */
var sqlite = require('./module/db.js'),
    db = sqlite.init('./db/demo.sqlite3');
 
// init
db.serialize(function () {
  var create = new Promise(function (resolve, reject) {
		// DBの初期化
    db.get('select count(*) from sqlite_master where type="table" and name=$name',{ $name: 'demo_table' }, function (err, res) {
      var exists = false;
      if (0 < res['count(*)']) { exists = true; }
 
      resolve(exists);
    });
  });

  create.then(function (exists) {
    if (!exists) {
      db.run('create table demo_table (id integer primary key, name text)');
    }
  });
});

// データの挿入
var insert = function (param){
  db.serialize(function () {
 
    db.run('insert or ignore into demo_table (id, name) values ($i, $n)', 
      {
        $i: param.id,
        $n: param.name
      }
    );
 
    // ↓でもOK
    // db.run('insert or ignore into demo_table (id, name) values (?, ?)', [param.id, param.name]);
  });
};
/**
 * データの取得
 * eachで1件ずつ取得して処理される。
 * 非同期処理なので処理される順番は保証されない 
 * @param {*} condition 
 * @param {*} callback 
 */
var selectEach = function (condition, callback) {
  db.serialize(function () {
    db.each('select id, name from demo_table where id > ?', 
           [condition.id], 
           function (err, res) {
             if (err) throw err;
             callback(err);
    });
  });
};

/**
 * データの取得
 * 一括で取得。順番が保持される。
 * @param {*} condition 
 * @param {*} callback 
 */
var selectAll = function (condition, callback) {
  db.serialize(function () {
    db.all('select id, name from demo_table where id > ?', 
           [condition.id], 
           function (err, rows) {
             if (err) throw err;
 
             rows.forEach(function (row) {
               callback(row);
             });
    });
  });
};

/**
 * promise版
 * @param {*} condition 
 */
var selectValue = function (condition) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get('select name from demo_table where id = $id',
        { $id: condition.id },
        function (err, res) {
          if (err) return reject(err);
           
          resolve(res);
      });
    });
  });
}; 

insert({id:'123', name:`test`}); 

// 検索してなんかする処理
var condition = {
  id  : '123'
};

 
selectValue(condition).then(function (result) {
  console.log('Success:', result.name);
}).catch(function (err) {
  console.log('Failure:', err);
});
