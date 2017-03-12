# express lesson

[expressチュートリアル][*1]  を試す。

## フォルダ構成

```yml
- express # プロジェクトフォルダ
  - bin   # docker起動用シェルファイル
	  - container_build.sh # docker-compose build
	  - bash.sh            # docker-compose run express /bin/bash
		- start.sh           # docker-compose up
	- express # dockerfile用フォルダ
	  - Dockerfile
	- docker-compose.yml # docker-compose 設定ファイル
	- myapp # expressプロジェクトフォルダ
		- public # 静的ファイル
			+ images
			+ javascripts
			+ stylesheets
		- routes # ルーティング
			- index.js
			- users.js
		- views # viewファイル
			- error.pug
			- index.pug
			- layout.pug
		- .gitignore   # git用設定ファイル
		- app.js       # expressサーバの設定
		- package.json # packageファイル
```

## インストール


docker-compose.yml
```yml
express:
  build: ./express
  volumes:
   - ./myapp/package.json:/my_express/myapp/package.json
   - ./myapp/app.js:/my_express/myapp/app.js
   - ./myapp/public:/my_express/myapp/public
   - ./myapp/views:/my_express/myapp/views
   - ./myapp/routes:/my_express/myapp/routes
  ports:
    - "80:3000"
  command: [node, bin/www]
```

Dockerfile
```bash
FROM node:7.7.1
WORKDIR /my_express
RUN npm init -y
RUN npm install express-generator -g
# .gitignoreの追加
# viewエンジンにpugを使用
RUN express myapp --git --pug --view pug 
WORKDIR /my_express/myapp
RUN npm install body-parser --save
RUN npm install cookie-parser --save
RUN npm install debug --save
RUN npm install morgan --save
RUN npm install serve-favicon --save
RUN npm install pug --save
RUN npm install express@5.0.0-alpha.5 --save
```

テンプレートエンジンのjadeがライセンスの関係で[pug][*3]に変わるようなので、
そちらに対応。

## 静的ファイルを使用するサンプル

```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// ビューエンジンとしてpugを指定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// express.static 関数に指定するパスは、node プロセスを起動するディレクトリーに対して相対的
// 別のディレクトリーから Express アプリケーションを実行する場合は、
// 提供するディレクトリーの絶対パスを使用する方が安全。
app.use('/static', express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

// メソッドのテスト

app.all('/method_test', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

// GET method route
app.get('/method_test', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/method_test', function (req, res) {
  res.send('POST request to the homepage')
})

// PUT method route
app.put('/method_test', function (req, res) {
  res.send('PUT request to the homepage')
})
// DELETE method route
app.delete('/method_test', function (req, res) {
  res.send('DELETE request to the homepage')
});


// その他のメソッドのテスト
['head',     'trace',     'copy',        'lock',   'mkcol',     'move', 
 'purge',    'propfind',  'proppatch',   'unlock', 'report',    'mkactivity',
 'checkout', 'merge',     'm-search',    'notify', 'subscribe', 'unsubscribe', 
 'patch',    'search',    'connect'
].forEach(_method=>{
    app[_method]('/method_test', function(req, res){
      res.send(`${_method} request to the homepage`)
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

staticのオプションについては以下を参照。

[標準ミドルウェア（static)オプション][*4]

## 参考

[expressチュートリアル日本語][*1]  
[expressチュートリアル英語][*2]  
[pug][*3]  


[*1]:http://expressjs.com/ja/starter/installing.html
[*2]:http://expressjs.com/en/starter/installing.html
[*3]:https://expressjs.com/en/guide/using-template-engines.html
[*4]:http://expressjs.com/ja/guide/using-middleware.html#middleware.built-in
