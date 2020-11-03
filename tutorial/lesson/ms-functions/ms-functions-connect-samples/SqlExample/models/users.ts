import * as db from './db';

export const select = async ()=>{
  const connection = await db.getConnection();
  const query = "select * from Users";
  return await db.read(connection, query)
}
