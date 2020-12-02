'use strict'
const fileSystem = require('../../dist/file-system').default
const uuid = require('uuid')
const request = require('supertest')

// ストレージとしてはfile-systemの実装が使われるようにする
process.env.npm_lifecycle_event = 'file-system'

const app = require('../../bin/www')

// モジュールのモック作成
jest.mock('../../dist/file-system')
jest.mock('uuid')

// テスト完了後にhttpサーバを終了
afterAll(() => app.close())

describe('app', () => {
  describe('GET /api/todos', () => {
    describe('completedが指定されていない場合', () => {
      test('fetchAll()で取得したToDoの配列を返す', async () => {
        const todos = [
          { id: 'a', title: 'ネーム', completed: false },
          { id: 'b', title: '下書き', completed: true },
        ]

        // モックが返す値の指定
        fileSystem.fetchAll.mockResolvedValue(todos) // fileSystem.fetchAll.mockReturnValue(Promise.resolve(todos))と同じ意味

        // リクエストの送信
        const res = await request(app).get('/api/todos')

        // レスポンスのアサーション
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(todos)
      })
      test('fetchAll()が失敗したらエラーを返す', async () => {
        fileSystem.fetchAll.mockRejectedValue(new Error('fetchAll()失敗'))
        const res = await request(app).get('/api/todos')

        expect(res.statusCode).toBe(500)
        expect(res.body).toEqual({ error: 'fetchAll()失敗' })
      })
    })
    describe('completedが指定されている場合', () => {
      test('completedを引数にfetchByCompleted()を実行し取得したToDoの配列を返す', async () => {
        const todos = [
          { id: 'a', title: 'ネーム', completed: false },
          { id: 'b', title: '下書き', completed: true },
        ]
        fileSystem.fetchByCompleted.mockResolvedValue(todos)
        for (const completed of [true, false]) {
          const res = await request(app).get('/api/todos').query({ completed })
          expect(res.statusCode).toBe(200)
          expect(res.body).toEqual(todos)
          // fetchByCompletedの引数のアサーション
          expect(fileSystem.fetchByCompleted).toHaveBeenCalledWith(completed)
        }
      })
      test('fetchByCompleted()が失敗したらエラーを返す', async () => {
        fileSystem.fetchByCompleted.mockRejectedValue(
          new Error('fetchByCompleted()失敗'),
        )
        const res = await request(app)
          .get('/api/todos')
          .query({ completed: true })

        expect(res.statusCode).toBe(500)
        expect(res.body).toEqual({ error: 'fetchByCompleted()失敗' })
      })
    })
  })
  describe('POST /api/todos', () => {})
})
