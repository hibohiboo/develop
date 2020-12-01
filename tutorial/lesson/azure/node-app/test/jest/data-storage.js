'use strict'
/**
 * ID順にToDoをソート
 */
function sortTodoById(todos) {
  return todos.sort((a, b) => (a.id > b.id ? 1 : -1))
}

for (const dataStorageName of ['file-system', 'sqlite']) {
  const {
    fetchAll,
    fetchByCompleted,
    create,
    update,
    remove,
  } = require(`../../dist/${dataStorageName}`).default

  describe(dataStorageName, () => {
    // 毎回のテスト実行前に全てのToDoを削除
    beforeEach(async () => {
      const allTodos = await fetchAll()
      await Promise.all(allTodos.map(({ id }) => remove(id)))
    })

    describe('create(), fetchAll()', () => {
      test('create()で作成したToDoをfetechAll()で取得できる', async () => {
        expect(await fetchAll()).toEqual([])

        const todo1 = { id: 'a', title: 'ネーム', completed: false }
        await create(todo1)
        expect(await fetchAll()).toEqual([todo1])

        const todo2 = { id: 'b', title: '下書き', completed: false }
        await create(todo2)
        const todo3 = { id: 'c', title: 'ペン入れ', completed: false }
        await create(todo3)
        expect(sortTodoById(await fetchAll())).toEqual([todo1, todo2, todo3])
      })
    })
  })
}
