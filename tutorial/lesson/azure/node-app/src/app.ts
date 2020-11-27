import express from 'express'
var app = express();

app.get('/api/hello', (req, res) => {
  return res.json('hello world!!')
})

export default app
