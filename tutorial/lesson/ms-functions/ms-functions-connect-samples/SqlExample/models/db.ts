import {Connection,Request, TYPES } from 'tedious'

// https://qiita.com/ozawako1/items/c08b281fc3b2791bba6a
// https://www.microsoft.com/en-us/sql-server/developer-get-started/node/ubuntu/step/2.html
// https://tediousjs.github.io/tedious/api-request.html
// https://qiita.com/tabizou/items/759105b271c419fe6683
let connectionInstance = null;
export const getConnection = () => new Promise<Connection>(async (resolve, reject)=>{
  if(connectionInstance) {
    resolve(connectionInstance)
  }
  try {
    connectionInstance = await createConnection()
    resolve(connectionInstance)  
  } catch (err) {
    reject(err)
  }
})

const createConnection = ()=> new Promise<Connection>((resolve, reject)=>{
  const config = {
    server: process.env["SQLConnectionServer"],
    authentication: {
        type: 'default',
        options: {
            userName: process.env["SQLConnectionUserName"],
            password: process.env["SQLConnectionUserPassword"],
        }
    },
    options: {
        database: process.env["SQLConnectionDatabase"],
        rowCollectionOnDone: true, // Requestの第二引数のrowsに値を入れるために必要
        rowCollectionOnRequestCompletion: true,  // Requestの第二引数のrowsに値を入れるために必要
    }
  }
  const connection = new Connection(config);
  connection.on('connect', function(err) {  
    if (err) {
      reject(err)
      return
    }  
    resolve(connection)
  });
})

/**
 * レコードをオブジェクトにして返す
 * @param columns レコード1行
 */
const formatORMapping = <T>(columns: any[]) => {
  const ret = {} as T
  columns.forEach(col=>{
    console.log(col)
    ret[col.metadata.colName] = col.value
  })
  return ret
}
export const read = <T>(connection: Connection, query: string) => new Promise<T[]>((resolve, reject) =>{
  const request = new Request(query, (err, rowCount, rows) => {
    if (err) {
        reject(err);
        return;
    }
    console.log(rowCount + ' row(s) returned');
    // rows Will only be avaiable if Connection's config.options.rowCollectionOnRequestCompletion is true.
    // console.log('result', rows)
    resolve(rows.map<T>(formatORMapping))
  });
  // let result = "";
  // request.on('row', function(columns) {
  //   columns.forEach(function(column) {
  //       if (column.value === null) {
  //           console.log('NULL');
  //       } else {
  //           result += column.value + " ";
  //       }
  //   });
  //   console.log(result);
  //   result = "";
  // });
  connection.execSql(request);
})


// useColumnNames=falseのときのrowsの戻り値例
// [
//   [
//     {
//       "value": 1,
//       "metadata": {
//         "userType": 0,
//         "flags": 16,
//         "type": {
//           "id": 56,
//           "type": "INT4",
//           "name": "Int"
//         },
//         "colName": "UserID"
//       }
//     },
//     {
//       "value": "テストユーザ",
//       "metadata": {
//         "userType": 0,
//         "flags": 10,
//         "type": {
//           "id": 231,
//           "type": "NVARCHAR",
//           "name": "NVarChar",
//           "maximumLength": 4000
//         },
//         "collation": {
//           "lcid": 1041,
//           "flags": 1,
//           "version": 0,
//           "sortId": 0,
//           "codepage": "CP932"
//         },
//         "dataLength": 256,
//         "colName": "Name"
//       }
//     }
//   ]
// ]