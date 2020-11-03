import * as db from './db';
interface User {
  UserID: number
  Name: string
}
export const select = async ()=>{
  const connection = await db.getConnection();
  const query = "select * from Users";
  return await db.read<User[]>(connection, query)
}
