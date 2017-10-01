# typescriptについて

## jsへの変換の確認
--target esnextで出力すると、単に型注釈を取り除いただけの素直なJavaScriptが出力される。

## 基本

### 変数

```typescript
// 変数に初期値を与えると初期値の型がそのまま変数の型になる（型推論される）
// 省略しても問題のない型の記述は積極的に省略してしまってよい！
{
  let str = "文字列";
  let num = 1;
  let bool = true;

  let func = () => { };
  let obj = {};

  console.log(str, num, bool, func(), obj);
}

// 型推論に頼らずに型注釈を明示的に書いてもよい
// 特別な理由がない限り、このやり方に長所はない
{
  let str: string = "文字列";
  let num: number = 1;
  let bool: boolean = true;

  let func: Function = () => { };
  // any はなんでも型
  let obj: any = {};

  console.log(str, num, bool, func(), obj);
}
```

### クラス

```typescript
class Base {
  // インスタンス変数
  num = 1;

  // 初期値を与えない場合は型の指定が必要
  str: string;

  // プロパティ名に?をつけると省略可能（undefinedである可能性がある）ことを表せる
  regExpOptional?: RegExp;

  constructor(str: string) {
    // strは省略可能じゃないのでコンストラクタで初期値を設定しなければならない
    // 設定し忘れても現在のTypeScriptはエラーにしてくれないので注意が必要…
    this.str = str;
  }

  // メソッドの定義 返り値は省略してもOK
  hello(): string {
    return `Hello, ${this.str}`;
  }

  get regExp() {
    if (!this.regExpOptional) {
      return new RegExp("test");
    }

    return this.regExpOptional;
  }
}

const base = new Base("world");
console.log(base.hello());

export { };
```

#### アクセス修飾子

|修飾子|アクセス範囲|
|:--|:--|
|public|デフォルト。通常の範囲|
|protected|子要素からは参照可能|
|private|子要素からも不可|

```typescript
class Base {
  a = "a";
  public b = "b";
  protected c = "c";
  private d = "d";

  method() {
    // privateなプロパティは利用しているコードが一箇所もないと警告してもらえる
    this.d;
  }
}
```

#### 引数プロパティ宣言

```typescript
// コンストラクタの引数にアクセス修飾子をあわせて書くと、インスタンス変数としてその値が利用可能になる
class BaseA {
  constructor(public str: string) {
  }
}

// BaseA と等価な定義
class BaseB {
  str: string;
  constructor(str: string) {
    this.str = str;
  }
}
```

### 関数

```typescript
// 関数名(): 型 の形で型指定可能
function hello(word: string): string {
  return `Hello, ${word}`;
}
hello("TypeScript");

// 返り値の型を省略すると返り値の型から推論される
function bye(word: string) {
  return `Bye, ${word}`;
}
bye("TypeScript");

// ? をつけると呼び出しときに引数が省略可能になる
function hey(word?: string) {
  // 省略可能にした時はundefinedの時の考慮が必要！
  return `Hey, ${word || "TypeScript"}`;
}
hey();

// デフォルト値の指定で仮引数の型を省略したりもできる
function ahoy(word = "TypeScript") {
  return `Ahoy! ${word}`;
}
ahoy();

```

#### 可変長引数

```typescript
// 可変長引数の場合は仮引数の最終的な型を指定
function hello(...args: string[]) {
  return `Hello, ${args.join(" & ")}`;
}
// Hello, TS & JS と表示される
console.log(hello("TS", "JS"));

```

#### 非同期関数

```typescript
function returnByPromise(word: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(word);
    }, 100);
  });
}

// async functionの返り値の型は必ずPromiseになる
async function helloAsync(): Promise<string> {
  // この関数は実行すると A, TypeScript, B が順番に表示される

  console.log("A");
  // Promiseな値をawaitすると中身が取り出せる（ように見える）
  const word = await returnByPromise("TypeScript");
  console.log(word);
  console.log("B");

  return `Hello, ${word}`;
}

// awaitが使えるのは必ずasync functionの中
(async () => {
  const hello = await helloAsync();
  console.log(hello);
})();

// 普通にPromiseとして扱うこともできる
helloAsync().then(hello => console.log(hello));
```

* Async関数の返り値の型は常に`Promise`
* generatorの返り値の型は常に`IterableIterator`
* async generatorの返り値の型は常に`AsyncIterableIterator`


|option|mean|
|:--|:--|
|module|commonjsの形式|
|target|es6にトランスパイル|
|noImplicitAny|any型を許可|
|sourcemap|ソースマップの出力|

## 参考

[TypeScript2系のコンパイラのオプション一覧][*1]
[Revised Revised TypeScript in Definitelyland][*2]

[*1]:https://qiita.com/IganinTea/items/f88bea469bff56cfbda6
[*2]:http://typescript.ninja/typescript-in-definitelyland/index.html