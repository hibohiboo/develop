## ステートとライフサイクル

### 時計サンプル 

```jsx
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
```

propで時間を与えるように書換

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

### es6のクラスを作る

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

#### 
1. `render()` メソッド中の `this.props.date` を `this.state.date` に置き換える


```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. コンストラクタでstateの設定

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
3. ` <Clock date={new Date()} />`からdate propを取り除く

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

#### できあがり

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
## ライフサイクル

要素が作成され、Reactから`mounting`されるときは`componentDidMount()`が呼ばれる。
要素が削除され、Reactから`unmounting`されるときには`comonnentWillUnmount()`が呼ばれる。

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
1. `<Clock />` が `ReactDOM.render()`に与えられたとき、,
React は Clock componentの`constructor()` を呼び出す。
Clockは`this.state`を現在の時刻を含むオブジェクトで初期化する。
後で`this.state`を更新する。

2.  Reactは`render()`を呼び、DOMに要素を追加する

3. Reactが`Clock`要素を追加した後、`ComponentDidMount()`が呼び出される。
`tick()`を呼ぶように、ブラウザに1秒間隔でのタイマーがセットされる。

4. `tick()`が呼ばれると、`this.setState()`で時刻を設定しなおす。`this.state`の変化を検知したReactは
再度`render()`を呼び出す。

### 直接steteの更新はできない

```jsx
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
```


### 非同期での更新の場合

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

### 更新のマージ

```jsx
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
 componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

### データフローダウン

```jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

それぞれの`<Clock />`は独自のタイマーを持ち、独立している。  


## 参考

[react tutorial][*1]

[*1]:https://facebook.github.io/react/docs/state-and-lifecycle.html