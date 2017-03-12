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
