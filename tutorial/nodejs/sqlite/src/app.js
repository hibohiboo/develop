
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
 
    db.run('insert or ignore into demo_table (id, name) values ($i, $t)', 
      {
        $i: param.id,
        $n: param.name
      }
    );
 
    // ↓でもOK
    // db.run('insert or ignore into demo_table (id, name) values (?, ?)', [param.id, param.name]);
  });
};