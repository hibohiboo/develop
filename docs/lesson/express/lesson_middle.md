# express lesson


## ミドルウェアのテスト

ミドルウェアのテスト

routeindex.js
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ミドルウェアのテスト
router.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

router.get('/user/:id', function (req, res, next) {
  res.send('USER');
});


module.exports = router;
```

index.pug
```jade
extends layout

block content
  h1= title
  p(id="message") Welcome to #{title}
  form(method="POST" action="method_test")
    input(type="submit" value="POSTForm")
  button(id="get") GETテスト
  button(id="post") POSTテスト
  button(id="put") PUTテスト
  button(id="delete") DELETEテスト
  ul
  each val in   ['head',     'trace',     'copy',        'lock',   'mkcol',     'move', 'purge',    'propfind',  'proppatch',   'unlock', 'report',    'mkactivity', 'checkout', 'merge',     'm-search',    'notify', 'subscribe', 'unsubscribe', 'patch',    'search',    'connect']
    li
      button(id=val)=val
  script(src="static/javascripts/method_test.js")
```

XMLHttpRequestではGET, POST, PUT, DELETEをサポート。

method_test.js
```js
(function(){
  const message = document.getElementById('message');
  // イベント設定
  document.getElementById('get'   ).addEventListener('click', ()=>{httpTest('GET')});
  document.getElementById('post'  ).addEventListener('click', ()=>{httpTest('POST')});
  document.getElementById('put'   ).addEventListener('click', ()=>{httpTest('PUT')});
  document.getElementById('delete').addEventListener('click', ()=>{httpTest('DELETE')});
  ['head',     'trace',     'copy',        'lock',   'mkcol',     'move', 
   'purge',    'propfind',  'proppatch',   'unlock', 'report',    'mkactivity',
   'checkout', 'merge',     'm-search',    'notify', 'subscribe', 'unsubscribe', 
   'patch',    'search',    'connect'
  ].forEach(_method=>{
		  // ※ HEAD以外はXMLHttpRequestで非サポート
      document.getElementById(_method).addEventListener('click', ()=>{httpTest(_method)});
	});

	function httpTest(method){
		const request = new XMLHttpRequest();
		request.open(method, 'method_test', false);
		request.send();
		if (request.status === 200) {
			console.log(request);
			message.textContent = request.responseText;
		}
	}
})();
```

## 処理のスキップのサンプル

routes/index.js
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0){
    // 次のルートに制御を渡す
    next('route');
  } else {
    // otherwise pass the control to the next middleware function in this stack
    next(); 
  }

}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// next('route')で渡された先
router.get('/user/:id', function (req, res, next) {
  res.render('special');
});
module.exports = router;
```

## 参考

[expressチュートリアル日本語][*1]  
[expressチュートリアル英語][*2]  
[pug][*3]  


[*1]:http://expressjs.com/ja/starter/installing.html
[*2]:http://expressjs.com/en/starter/installing.html
[*3]:https://expressjs.com/en/guide/using-template-engines.html