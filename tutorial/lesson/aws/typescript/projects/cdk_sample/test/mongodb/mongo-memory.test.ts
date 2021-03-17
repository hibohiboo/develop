import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

// https://blog.koh.dev/2019-06-11-mongodb-jest/
// http://demouth.hatenablog.com/entry/2018/06/05/224441
// https://github.com/mongodb/node-mongodb-native
declare global {
  namespace NodeJS {
    interface Global {
      MONGO_MEMORY_SERVER: MongoMemoryServer;
      MONGODB_TEST_URI: string;
    }
  }
}
const initMemoryServer = async () => {
  const mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  global.MONGO_MEMORY_SERVER = mongoServer
  global.MONGODB_TEST_URI = mongoUri
}

interface User {
  name: string
  created: string
  updated: string
}

// テストデータ
const users: User[] = [
  { name: 'a', created: '2020-11-10T00:00:00Z', updated: '2020-12-10T00:00:00Z', },
  { name: 'b', created: '2020-11-10T00:10:00Z', updated: '2020-12-10T00:10:00Z', },
  { name: 'c', created: '2020-11-10T00:20:00Z', updated: '2020-12-10T00:20:00Z', },
  { name: 'd', created: '2020-11-10T00:30:00Z', updated: '2020-12-10T00:30:00Z', },
  { name: 'e', created: '2020-11-10T00:40:00Z', updated: '2020-12-10T00:40:00Z', },


]

const dbName = 'test-user-db'
const collectionName = 'test-user'
const documentToUser = ({ name, created, updated }: Record<string, string>) => ({ name, created, updated })
describe('insert', () => {
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    await initMemoryServer()
    connection = await MongoClient.connect(global.MONGODB_TEST_URI);
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await global.MONGO_MEMORY_SERVER.stop();
  });

  // テストデータをテスト毎に挿入
  beforeEach(async () => {
    await db.collection(collectionName).deleteMany({})
    await db.collection(collectionName).insertMany(users)
  })

  it('指定した時間以降のデータがとれる', async () => {
    const users = db.collection(collectionName);

    const findList = (await users.find({ created: { $gte: '2020-11-10T00:30:00Z' } }).toArray()).map(documentToUser)

    const expectedList = [{ name: 'd', created: '2020-11-10T00:30:00Z', updated: '2020-12-10T00:30:00Z', },
    { name: 'e', created: '2020-11-10T00:40:00Z', updated: '2020-12-10T00:40:00Z', },]
    expect(expectedList).toEqual(findList);
  });
  it('指定した範囲のデータがとれる', async () => {
    const users = db.collection(collectionName);

    const findList = (await users.find({ created: { $gte: '2020-11-10T00:30:00Z' }, updated: { $lte: '2020-12-10T00:30:00Z' } }).toArray()).map(documentToUser)

    const expectedList = [{ name: 'd', created: '2020-11-10T00:30:00Z', updated: '2020-12-10T00:30:00Z', },]
    expect(expectedList).toEqual(findList);
  });
});