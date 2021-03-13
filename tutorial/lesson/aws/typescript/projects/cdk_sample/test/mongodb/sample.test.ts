import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }
}

describe('insert', () => {
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__);
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
});