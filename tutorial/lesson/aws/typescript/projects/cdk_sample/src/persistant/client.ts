import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

let dbClient: DocumentDBClient | undefined;
export class DocumentDBClient {
  private connection: MongoClient;
  private connectionString: string;
  private dbName: string;
  private db: Db;
  constructor(_connectionString: string | undefined, _dbName: string | undefined) {
    if (!_connectionString) {
      throw Error('document connection string is required');
    }
    if (!_dbName) {
      throw Error('SampleDbName is required');
    }
    this.connectionString = _connectionString;
    this.dbName = _dbName;
  }
  async init() {
    this.connection = await MongoClient.connect(this.connectionString);
    this.db = await this.connection.db(this.dbName);
  }

  collection(name: string) {
    return this.db.collection(name);
  }

  close() {
    this.connection.close();
  }
}


export const getClient = async (
  connectionString: string | undefined = process.env.DOCUMENTDB_CONNECTION_STRING,
  dbName: string | undefined = process.env.DEFAULT_DB_NAME) => {
  if (dbClient) {
    return Promise.resolve(dbClient);
  }
  dbClient = new DocumentDBClient(connectionString, dbName)
  await dbClient.init();
  return dbClient;
}
