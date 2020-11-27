var express = require('express');
var app = express();

app.get('/api/hello', (req, res) => {
  return res.json('hello world')
})
module.exports = app;