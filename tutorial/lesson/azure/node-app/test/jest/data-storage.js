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

    describe('fetchByCompleted()', () => {
      test('completedの値が指定したものと等しいToDoだけを取得できる', async () => {
        // 初期状態確認
        expect(await fetchByCompleted(true)).toEqual([])
        expect(await fetchByCompleted(false)).toEqual([])

        // ToDoを3件追加
        const todo1 = { id: 'a', title: 'ネーム', completed: false }
        await create(todo1)
        const todo2 = { id: 'b', title: '下書き', completed: true }
        await create(todo2)
        const todo3 = { id: 'c', title: 'ペン入れ', completed: false }
        await create(todo3)

        // fetchByCompletedの結果を確認
        expect(await fetchByCompleted(true)).toEqual([todo2])
        expect(sortTodoById(await fetchByCompleted(false))).toEqual([
          todo1,
          todo3,
        ])
      })

      describe('update()', () => {
        const todo1 = { id: 'a', title: 'ネーム', completed: false }
        const todo2 = { id: 'b', title: '下書き', completed: false }
        beforeEach(async () => {
          await create(todo1)
          await create(todo2)
        })
      })
      describe('remove()', () => {
        const todo1 = { id: 'a', title: 'ネーム', completed: false }
        const todo2 = { id: 'b', title: '下書き', completed: false }
        beforeEach(async () => {
          await create(todo1)
          await create(todo2)
        })
        test('指定したIDのToDoを削除する', async () => {
          expect(await remove('b')).toBe('b')
          expect(await fetchAll()).toEqual([todo1])
        })
        test('存在しないIDを指定するとnullを返す', async () => {
          expect(await remove('c')).toBeNull()
          expect(sortTodoById(await fetchAll())).toEqual([todo1, todo2])
        })
      })
    })
  })
}
