import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

class DocumentDBClient {
  private connection: MongoClient;
  private connectionString: string;
  constructor(_connectionString: string | undefined) {
    if (!_connectionString) {
      throw Error('document connection string is required');
    }
    this.connectionString = _connectionString;
  }
  async init() {
    this.connection = await MongoClient.connect(this.connectionString);
  }
  async getDb(dbName: string) {
    return this.connection.db(dbName);
  }
}

let dbClient: DocumentDBClient | undefined;
const getClient = async () => {
  if (dbClient) {
    return Promise.resolve(dbClient);
  }
  dbClient = new DocumentDBClient(process.env.DocumentDBConnectionString)
  await dbClient.init();
  return dbClient;
}

let db: Db;
export const getDb = async () => {
  if (db) {
    return Promise.resolve(db);
  }
  const dbName = process.env.SampleDbName;
  if (!dbName) {
    throw Error('SampleDbName is required');
  }
  const client = await getClient();
  return db = await client.getDb(dbName);
}

