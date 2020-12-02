import { extname } from 'path'
import { readdir, readFile, writeFile, unlink } from 'fs/promises'
import type { Todo, DataStorage } from '../types'

const exportsObj: DataStorage<Todo> = {
  fetchAll: async () => {
    const files = (await readdir(__dirname)).filter(
      (file) => extname(file) === '.json',
    )
    return Promise.all(
      files.map((file) =>
        readFile(`${__dirname}/${file}`, 'utf8').then(JSON.parse),
      ),
    )
  },
  fetchByCompleted: (completed) =>
    exportsObj
      .fetchAll()
      .then((all) => all.filter((todo) => todo.completed === completed)),
  create: (todo) =>
    writeFile(`${__dirname}/${todo.id}.json`, JSON.stringify(todo)),
  update: async (id, update) => {
    const filename = `${__dirname}/${id}.json`
    return readFile(filename, 'utf8').then(
      (content) => {
        const todo = { ...JSON.parse(content), ...update }
        return writeFile(filename, JSON.stringify(todo)).then(() => todo)
      },
      (err) => (err.code === 'ENOENT' ? null : Promise.reject(err)),
    )
  },
  remove: (id) =>
    unlink(`${__dirname}/${id}.json`).then(
      () => id,
      (err) => (err.code === 'ENOENT' ? null : Promise.reject(err)),
    ),
}
export default exportsObj
