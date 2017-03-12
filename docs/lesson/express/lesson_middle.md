# express lesson


## ルータ・レベルのミドルウェア

ミドルウェアのテスト

routers/index.js
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

## エラー処理ミドルウェア

引数は４つである必要がある。

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 標準装備のミドルウェア

staticのみ。

## 参考

[expressチュートリアル日本語][*1]  
[expressチュートリアル英語][*2]  
[pug][*3]  


[*1]:http://expressjs.com/ja/starter/installing.html
[*2]:http://expressjs.com/en/starter/installing.html
[*3]:https://expressjs.com/en/guide/using-template-engines.html