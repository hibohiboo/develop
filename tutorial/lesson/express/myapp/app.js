var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
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
