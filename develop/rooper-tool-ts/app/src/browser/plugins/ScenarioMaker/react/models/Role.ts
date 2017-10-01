
// 役職リストにしたとき、同一の役職IDのものが入る可能性があるので、唯一のキーを付与。
let nextRoleKey:number = 1;

export class Role {
  constructor( public id: number,
               public name: string,
               public limit: number, // 0 = 無限 
               public key:number = nextRoleKey++){}
}
