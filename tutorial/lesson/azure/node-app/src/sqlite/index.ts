import { promisify } from 'util'
import { join } from 'path'
import type { ID, Todo, DataStorage } from '../types'
import type { RunResult, sqlite3 as Sqlite3 } from 'sqlite3'

interface TodoSQLite {
  id: ID
  title: string
  completed: 0 | 1
}
type SQLiteArgs = [sql: string, ...params: any[]]
type PromiseDbGet = <T>(arg: string, arg2?: any) => Promise<T>
type PromiseDbAll = <T>(arg: string, arg2?: any) => Promise<T>

const sqlite3: Sqlite3 =
  process.env.NODE_ENV === 'production'
    ? require('sqlite3')
    : require('sqlite3').verbose()
const db = new sqlite3.Database(join(__dirname, 'sqlite'))

const dbGet: PromiseDbGet = promisify(db.get.bind(db))

const dbRun = function (...args: SQLiteArgs) {
  return new Promise<RunResult>((resolve, reject) =>
    db.run.apply(db, [
      ...args,
      function (this: RunResult, err: any) {
        err ? reject(err) : resolve(this)
      },
    ]),
  )
}

const dbAll: PromiseDbAll = promisify(db.all.bind(db))

dbRun(`CREATE TABLE IF NOT EXISTS todo (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL
)`).catch((err) => {
  console.log(err)
  process.exit(1)
})

function rowToTodo(row: TodoSQLite): Todo {
  return { ...row, completed: !!row.completed }
}

const exportsObj: DataStorage<Todo> = {
  fetchAll: () =>
    dbAll<TodoSQLite[]>('SELECT * FROM todo').then((rows) =>
      rows.map(rowToTodo),
    ),
  fetchByCompleted: (completed) =>
    dbAll<TodoSQLite[]>(
      'SELECT * FROM todo WHERE completed = ?',
      completed,
    ).then((rows: TodoSQLite[]) => rows.map(rowToTodo)),
  create: async (todo) => {
    await dbRun(
      'INSERT INTO todo VALUES (?,?,?)',
      todo.id,
      todo.title,
      todo.completed,
    )
  },
  update: (id, update) => {
    const setColumns = []
    const values = []
    for (const column of ['title', 'completed'] as const) {
      if (column in update) {
        setColumns.push(` ${column} = ? `)
        values.push(update[column])
      }
    }
    values.push(id)
    return dbRun(
      `UPDATE todo SET ${setColumns.join()} WHERE id = ?`,
      values,
    ).then(({ changes }) =>
      changes === 1
        ? dbGet<TodoSQLite>('SELECT * FROM todo WHERE id = ?', id).then(
            rowToTodo,
          )
        : null,
    )
  },
  remove: (id) =>
    dbRun('DELETE FROM todo WHERE id = ?', id).then(({ changes }) =>
      changes === 1 ? id : null,
    ),
}

export default exportsObj
