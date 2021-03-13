import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

import * as Users from '@/lambda/users/persistant/users';
import type { User } from '@/lambda/users/types';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }
}

// テストデータ
const users: User[] = [
  {
    username: 'user1',
    firstName: 'aaa',
    lastName: 'bbb',
    gender: 'male',
    age: 22
  },
  {
    username: 'user2',
    firstName: 'ccc',
    lastName: 'ddd',
    gender: 'male',
    age: 30
  },
  {
    username: 'user3',
    firstName: 'eee',
    lastName: 'fff',
    gender: 'female',
    age: 34
  }
]

describe('src/models/user', () => {
  let connection: MongoClient;
  let db: Db;

  // データベースに接続
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__);
    db = await connection.db(global.__MONGO_DB_NAME__);
  })

  // テストデータをテスト毎に挿入
  beforeEach(async () => {
    await db.collection('users').deleteMany({})
    await db.collection('users').insertMany(users)
  })

  // 接続を閉じる
  afterAll(() => {
    connection.close()
  })

  describe('クエリヘルパー', () => {
    describe('findOrCreate', () => {
      test('指定したusernameのユーザーが取得できる', async () => {
        const result = await Users.findByName('user1', () => Promise.resolve(db.collection('users')))
        expect(result?.username).toEqual('user1')
      })
    })
  })
})