import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { statusCode, paths } from './constants'
import type { Todo, DataStorage, HttpError, MiddlewareHandler } from './types'

const dataStorage: DataStorage<Todo> = require(`./${
  process.env.npm_lifecycle_event || 'file-system'
}`).default
// const dataStorage: DataStorage<Todo> = require('./file-system').default
// const dataStorage: DataStorage<Todo> = require('./sqlite').default

const app = express()
app.use(express.json())

// ToDo一覧の取得
app.get(paths.todos, (req, res, next) => {
  if (!req.query.completed) {
    return dataStorage.fetchAll().then((todos) => res.json(todos), next)
  }
  const completed = req.query.completed === 'true'
  dataStorage.fetchByCompleted(completed).then((todos) => res.json(todos), next)
})

// ToDoの新規登録
app.post(paths.todos, (req, res, next) => {
  const { title } = req.body
  if (typeof title !== 'string' || !title) {
    const err: HttpError = new Error('title is required')
    err.statusCode = statusCode.BadRequest
    return next(err)
  }
  const todo = { id: uuidv4(), title, completed: false }
  dataStorage
    .create(todo)
    .then(() => res.status(statusCode.Created).json(todo), next)
})

// Completedの設定、解除の共通処理
function completedHandler(completed: boolean): MiddlewareHandler {
  return (req, res, next) =>
    dataStorage.update(req.params.id, { completed }).then((todo) => {
      if (todo) {
        return res.json(todo)
      }
      const err: HttpError = new Error('Todo not found')
      err.statusCode = statusCode.NotFound
      next(err)
    }, next)
}

// ToDoのCompoetedの設定、解除
app
  .route(`${paths.todos}/:id/completed`)
  .put(completedHandler(true))
  .delete(completedHandler(false))

// Todoの削除
app.delete(`${paths.todos}/:id`, (req, res, next) =>
  dataStorage.remove(req.params.id).then((id) => {
    if (id !== null) {
      return res.status(statusCode.NoContent).end()
    }
    const err: HttpError = new Error('Todo not found')
    err.statusCode = statusCode.NotFound
    next(err)
  }, next),
)

// エラーハンドリングミドルウェア
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err)
  res.status(err.statusCode || 500).json({ error: err.message })
})
export default app
