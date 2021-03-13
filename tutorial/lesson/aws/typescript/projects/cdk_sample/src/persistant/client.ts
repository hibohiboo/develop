import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

class DocumentDBClient {
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
  get collection() {
    return this.db.collection;
  }
  close() {
    this.connection.close();
  }
}

let dbClient: DocumentDBClient | undefined;
export const getClient = async () => {
  if (dbClient) {
    return Promise.resolve(dbClient);
  }
  dbClient = new DocumentDBClient(process.env.DOCUMENTDB_CONNECTION_STRING, process.env.DEFAULT_DB_NAME)
  await dbClient.init();
  return dbClient;
}
