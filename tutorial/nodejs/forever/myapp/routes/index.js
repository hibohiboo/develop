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
