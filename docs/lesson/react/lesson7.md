## 配列とkey

```jsx

// mapは配列に適用した関数の返り値から新たな配列を作る関数
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

// 上記を参考に、reactでも配列を同様に扱える
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

上のソースをさらにタグにするには以下。

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## keys

上記のソースだと、consoleにkeyがないと警告がでる。  
以下のようにして、一意のkeyをつけてやる。

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

もし、今回のnumberのように一意になるものでなかった場合はindexを使う方法もある。

```jsx```jsx
const numbers = [1, 2, 3, 3, 5];
const listItems = numbers.map((number, index) =>
  <li key={index}>
    {number}
  </li>
);
```



## 参考

[react tutorial][*1]


[*1]:https://facebook.github.io/react/docs/lists-and-keys.html