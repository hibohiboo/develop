# lesson2

## jsxの文法

### jsx記法

jsxはトランスパイルでjavascriptのオブジェクトになる。  
戻り値にするなどといった使い方が可能。

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

```js
// クォーテーションを使用可能
// You may use quotes to specify string literals as attributes:
const element = <div tabIndex="0"></div>;

// {}で囲んでjsを使える。
// You may also use curly braces to embed a JavaScript expression in an attribute:
const element = <img src={user.avatarUrl}></img>;

```

### 子要素について

```js
// タグが空のときは />で閉じる
// If a tag is empty, you may close it immediately with />, like XML:
const element = <img src={user.avatarUrl} />;

// 子要素を持つことも出来る。
// JSX tags may contain children:
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

```

### 警告

属性はキャメルケースにすること。

```
    Caveat:
    Since JSX is closer to JavaScript than HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.
    For example, class becomes className in JSX, and tabindex becomes tabIndex.
```

### JSX Prevents Injection Attacks 

インジェクション対策にデフォルトでエスケープされる。

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

### JSX Represents Objects

babelでコンパイルするとReact.createElement()が呼ばれる。  
次の２つの例は同じ意味となる。

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

上のは下のようなオブジェクトが作成される。

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

これらは"React elements"と呼ばれる。


