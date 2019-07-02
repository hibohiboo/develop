# Node.js デザインパターン実行サンプル

## Web Spider

### サンプルコード動作確認
[この時点のソース](https://github.com/hibohiboo/garden/tree/3d0767437f32af8600f68aa60482b7049a905d38)  

### ts化
[この時点のソース](https://github.com/hibohiboo/garden/tree/27d8b9ed06f90767c1f3b38793937c404f3efae7)  

### 再帰的にリンク取得

[この時点のソース](https://github.com/hibohiboo/garden/tree/9e76770bfbf25de4430c8231a22a8ed71b586f6d)  


### 並列処理
[この時点のソース](https://github.com/hibohiboo/garden/tree/30c6be7cd86fda3b2731a35742fc6a2a93ddf3b8)  

### 同時起動タスク数の制限
[この時点のソース](https://github.com/hibohiboo/garden/tree/f9fa82b9dc186c672fb0eeb184daa27139ba122a)  

### 非同期の逐次処理
[この時点のソース](https://github.com/hibohiboo/garden/tree/6024d65cae757a909565a2d827e4d3dfaa22f63b)  

### 各要素に適用
[この時点のソース](https://github.com/hibohiboo/garden/tree/ad35ec986508c0000752d1b4edf04c85819e0eb7)  

### 非同期並列処理（タスク数の制限付き）
[この時点のソース](https://github.com/hibohiboo/garden/tree/1b5e8167fdac492310d4838a42b4e77fd0b420b8)  

### coを使ったらプロデューサ・コンシューマパターン

* callbackに何が入ってきているのかが、よく分からなかった
* → Node.js デザインパターン P.22 2.1.3 Node.jsのコールバックを参照
  * 「Nodeにおいてエラーは常に先頭の引数として、そして処理結果は2番目以降の引数としてコールバックに渡されます」
  * 「エラーが発生せずに処理が成功した場合、先頭の引数にはnullもしくはundefinedが渡されます」
* コールバック引数について、その他に重要そうな情報は以下。
  * 関数にコールバックを指定する場合には必ず最後の引数とする。Nodeのコアメソッドすべてに当てはまる。
  * 間にオプションの引数の有無にかかわらず、必ず最後の引数となる。
    * 例： fs.readFile(filename, [options], callback)
  * これは、コールバックを無名関数でその場で記述する場合に、後ろに引数がないほうが読みやすいということが理由である。

#### 参考：readFileの内部例

```js
fs.readFile = (filename, options, callback) => {
  if(typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof options === 'string') {
    options = {encoding: options};
  }

  // 省略 ...
}
```

[この時点のソース](https://github.com/hibohiboo/garden/tree/b7a7dfce22492c78a41be486b27954c4c9bca04f)  

## clone

### yield
[この時点のソース](https://github.com/hibohiboo/garden/tree/a84e8e9c63f6836dc81a35a9e07d184b62adc77b)
  
### thunk

* thunkとは、コールバック以外の全てを部分適用した関数のこと
[この時点のソース](https://github.com/hibohiboo/garden/tree/b7a7dfce22492c78a41be486b27954c4c9bca04f)
  
## zlib

### バッファ使用

[この時点のソース](https://github.com/hibohiboo/garden/tree/53b87b1ba5934bd20e182ed471dd8df8a8c279bb)



### ストリーム使用

[この時点のソース](https://github.com/hibohiboo/garden/tree/ee03583bebbcae8811de28c8ef1330499be4c42a)


### HTTPサーバにアップロード

* tscでエラーがでた。同じディレクトリのファイルがnamespaceの切らずに同じ定義をしたのが問題の模様。
  * https://qiita.com/TsuyoshiUshio@github/items/40baab89ee09c5838e5e
* serverとclientでビルドを分けるようにして対応。

[この時点のソース](https://github.com/hibohiboo/garden/tree/f0a4ca6d44a42da3609e91747249b92a77fbe42d)

#### クライアント側

* ファイルを読み込み、gzip圧縮する
* 圧縮したファイルをHTTPサーバへアップロード

#### サーバ側

* 受信したファイルを読みとる
* gzip展開する
* ファイルに保存する

#### 実行

sshを２つ立ち上げる

##### サーバの起動

```
$ ./bin/up.sh
```

##### クライアントの起動

```
$ ./bin/send.sh
```

### 暗号化

[この時点のソース](https://github.com/hibohiboo/garden/tree/f2002ee73e30c59f63adaace398fa290f705190b)

#### createCipherがdeprecatedだったのでcreateCipherivを試してみる
[この時点のソース](https://github.com/hibohiboo/garden/tree/8259655741d91d998cdde1fa59e6fdf754da2e13)


### アダプタ

#### LevelUp APIでのサンプル。ファイルをDBに保存する。
[この時点のソース](https://github.com/hibohiboo/garden/tree/b3ed4283b062f7ee7805a8b21815d196a31775e3)

##### TS化
[この時点のソース](https://github.com/hibohiboo/garden/tree/dff6990dc84719d196ede0a69b7731431d50fc0c)

##### 正式な実装

* level-filesystem
  * https://www.npmjs.com/package/level-filesystem
  * 4年前の実装だが、大丈夫か、、？



### ストラテジ

#### configをjsonとiniで設定
[この時点のソース](https://github.com/hibohiboo/garden/tree/d168f0b6a2502a5670677a890e5ae415355a1099)

### テンプレート

#### configをjsonで設定
[この時点のソース](https://github.com/hibohiboo/garden/tree/d61ae4708d61419abc5253433a4a21186f703477)

### ReactでSPA

#### 最初のReactコンポーネント
[この時点のソース](https://github.com/hibohiboo/garden/tree/9c56d8feb14efec2cf01f07edb22a7f28f2bdf18)

#### ルーティングの設定
[この時点のソース](https://github.com/hibohiboo/garden/tree/c47100d7ef59fa87d56837e5a4337d9828a3d1e8)

#### 再利用可能なコンポーネントの作成
[この時点のソース](https://github.com/hibohiboo/garden/tree/f4db7b64095d1c21b30ca9c3ba461d92859883e2)


### 非同期のバッチ処理とキャッシュの利用

#### 実行確認方法
サーバ側

```
bin/container_build.sh
bin/build.sh
bin/init-db.sh
bin/up.sh
```

クライアント側

```
bin/test.sh
```

#### キャッシュ処理もバッチ処理もないサーバの実装

[この時点のソース](https://github.com/hibohiboo/garden/tree/2a7a2d055cf23390b4ed21c0fb400790e7a3a0bd)

200 Total sales for item book is 1000432
All completed in: 8481ms

#### 非同期リクエストのバッチ処理

[この時点のソース](https://github.com/hibohiboo/garden/tree/aa1a9edbf50188eb6d6b242ce7f57b009ee353f4)

All completed in: 4505ms

#### 非同期リクエストにキャッシュを利かせる処理

[この時点のソース](https://github.com/hibohiboo/garden/tree/058062e3fc9f42661521ab74a2cfbca1147b5d76)

All completed in: 4029ms

#### プロミスを使ったバッチ処理とキャッシュ処理
[この時点のソース](https://github.com/hibohiboo/garden/tree/9b52922d9c8bdba3aaf98ec130c149efd34e5525)

All completed in: 4025ms

### 部分和問題のマルチプロセスによる対処

Then try to send one or more request to trigger the subset sum task:
  curl -G http://localhost:8000/subsetSum --data-urlencode "data=[116,119,101,101,-116,109,101,-105,-102,117,-115,-97,119,-116,-104,-105,115]" --data-urlencode "sum=0"
  
While a subset sum task is running, you can check the responsiveness of the server with a command like this:
  curl -G http://localhost:8000

[この時点のソース](https://github.com/hibohiboo/garden/tree/181a631751ef2afe2f2c7b791854d1d2662224e5)

### クラスタのテスト

#### クラスタなし
Requests per second:    117.59 [#/sec] (mean)
Time per request:       1700.806 [ms] (mean)

[この時点のソース](https://github.com/hibohiboo/garden/tree/16c75e50a5135e5fa4aa2e809e9c8ac1c0a465d8)

#### クラスタにして実行(2プロセス)

Requests per second:    217.19 [#/sec] (mean)
Time per request:       920.861 [ms] (mean)

[この時点のソース](https://github.com/hibohiboo/garden/tree/acc46ac0e273f45ed3f77a163473b2b727cf4723)

#### 再起動の確認

bin/bash.shでログインして確認。
マスタープロセスのPIDに-SIGUSR2のシグナルを送る。

```
root@281786299e67:/app# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  3.2  0.3 561496 29500 ?        Ssl  10:10   0:00 node app/server/clusteredApp
root        13  0.6  0.3 561268 29908 ?        Sl   10:10   0:00 /usr/local/bin/node /app/app/server/clusteredApp
root        14  0.5  0.3 561268 29852 ?        Sl   10:10   0:00 /usr/local/bin/node /app/app/server/clusteredApp

root@281786299e67:/app# kill -SIGUSR2 1
```


[この時点のソース](https://github.com/hibohiboo/garden/tree/97d1a64356a98b4f93e57256403e5da40f2d39bd)


## 参考
[サポートページ](https://www.marlin-arms.com/support/nodejs-design-patterns/)
[例題github](https://github.com/mushahiroyuki/ndp2/)
[react-router@v4を使ってみよう：シンプルなtutorial](https://qiita.com/muiscript/items/b4ca1773580317e7112e)
[react-router v4を使って静的ページでもルーティングする](https://ueqareer.net/2568#HashRouter)
[DockerでApache Benchをサクッと実行する](http://thr3a.hatenablog.com/entry/20190419/1555640388)
[node.js express foreverアプリをdockerコンテナ化する](https://note.mu/loftkun/n/n6613a73a8007)