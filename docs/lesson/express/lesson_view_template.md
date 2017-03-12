# ビューテンプレート

## デフォルト

jadeからpugに変更

```js
html
  head
    title= title
  body
    h1= message
```

## 

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

## 参考

[英語版チュートリアル][*1]  
[日本語版チュートリアル(jadeのままなのでpugに読み替える必要あり。)][*2]  

[*1]:http://expressjs.com/en/guide/using-template-engines.html
[*2]:http://expressjs.com/ja/guide/using-template-engines.html