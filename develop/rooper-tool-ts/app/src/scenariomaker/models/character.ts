export enum CharacterType {
  boyStudent=1,       // 男子学生
  girlStudent,        // 女子学生
  richMansDaughter,   // お嬢様
  shrineMaiden,       // 巫女
  policeOfficer,      // 刑事
  officeWorker,       // サラリーマン
  informer,           // 情報屋
  doctor,             // 医者
  patient,            // 患者
  classRep,           // 委員長
  mysteryBoy,         // イレギュラー
  alien,              // 異世界人
  godlyBeing,         // 神格
  popIdol,            // アイドル
  journalist,         // マスコミ
  boss,               // 大物
  nurse,              // ナース
  henchman,           // 手先
  illusion,           // 幻想
  scientist,          // 学者
  forensicSpecialist, // 鑑識官
  AI,                 // A.I.
  teacher,            // 教師
  transferStudent,    // 転校生
  soldier,            // 軍人
  blackCat            // 黒猫
} 

export class Character {
  constructor( public id:number, 
               public name:string, 
               public paranoiaLimit:number, 
               public selected:boolean=false){
  }
}
