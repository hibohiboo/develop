## Hello world

ReactのコンポーネントはHTMLのいずれかの要素をルートとして作成される。

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 要素の更新

Reactで作成された要素はimmutable(一度作ったら状態が変化しない)である。  
子要素や属性の変更をするにはReactDOM.render()で新しい要素を作成する必要がある。

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

```js
//app.js
import React from 'react';
import ReactDOM from 'react-dom';
import tick from './tick.jsx';

tick();
```

```jsx
// tick.jsx
import React from 'react';
import ReactDOM from 'react-dom';

export default function(){
  function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
  }

  setInterval(tick, 1000);

};
```

Reactの新しい要素はrender()を行った時、変更する必要のあるオブジェクトのみを更新する。

## 参考

[react tutorial][*1]

[*1]:https://facebook.github.io/react/docs/rendering-elements.html