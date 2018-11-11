// 変数宣言
const variable='test';
console.log(`[Debug]: ${variable}`);

// オブジェクトコピー
const srcObj={test: 'new!'};
const destObj = {};
Object.assign(destObj, srcObj);

//オブジェクトのスプレッド演算子サポート
const destObj2 = {...srcObj};

class Parent {
  constructor() {
      this.animaltype = "動物";
  }
  say() {
    console.log(`${this.animalType}だけどMSの中に永らく居たBOM信者の全身の毛をむしりたい`);
  }
}

class SmallAnimal extends Parent {
  constructor() {
    super();
    this.animaltype = "ポメラニアン";
  }
}

const a = new SmallAnimal();
a.say();

// 非同期処理をawaitで待つ
const fetchData = async (url) => {
  const resp = await fetch(url);
  const json = await resp.json();
  console.log(json);
};

const f = (a, b, c) => {
  console.log(a, b, c);
};

// a=1, b=2, c=3として実行される
f(...[1, 2, 3]);

// 可変長配列の新しいコード
const f2 = (a, b, ...c) => {
  console.log(a, b, c);
};
f2(1, 2, 3, 4, 5, 6);
// 1, 2, [3, 4, 5, 6];

// デフォルト引数
const f3 = (name="小動物", favorite="ストロングゼロ")

// 新しいループ
const iterable = [10, 20, 30];

for (const value of iterable) {
  console.log(value);
}

// async await
// for (let value of iterable) {
//   await doSomething(value);
// }


// map
const map = new Map([
  ["五反田", "約束の地"],
  ["戸越銀座", "TGSGNZ"]
]);

for (const [key, value] of map) {
    console.log(`${key} : ${value}`);
}

// keyだけでループしたい場合（以前同様）
for (const key of map.keys());
// valueだけでループしたい場合
for (const value of map.values());


const thinking = {
  name: "小動物",
  mind: "Python3と寝たい",
  reason: "`raise e from cause` べんりですよ"
};
// 分割代入
const {name="約束の地の住人", mind, reason} = thinking;
console.log(`${name}だけど${reason} ${mind}理由の一つです`);

//分割代入の左辺にスプレッド演算子をおくことで、「残りの要素」を扱う
//オブジェクトのスプレッド演算子はECMAScript 2018で公式の仕様に仲間入り
// 配列
const [ aa, bb, ...rest ] = array;
// オブジェクト
const { aaa, bbb, ...rest2 } = obj;