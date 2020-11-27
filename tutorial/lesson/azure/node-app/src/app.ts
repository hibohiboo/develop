import express from 'express'
const app = express()

app.get('/api/hello', (req, res) => {
  return res.json('hello world!!')
})

export default app
