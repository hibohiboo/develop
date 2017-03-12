var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ミドルウェアのテスト
router.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
// こちらは表示されない
router.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
module.exports = router;
