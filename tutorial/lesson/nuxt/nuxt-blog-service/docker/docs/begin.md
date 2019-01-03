# NuxtでSPA作成 2章

## プロジェクト作成

とりあえず、すべて空で作成。

```
bin/work/create-project.sh
```

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/f002b395f9ee592fd8298afe0b0859592b3f5418/spa)

## packageインストール

mypageを共有すると、windowsでエラーがでるので、必要なフォルダ・ファイルのみ共有。

### docker-compose.yml編集
yarn.lockファイルを空のファイルで作成して共有。
node_modules用のキャッシュを作成。

### 実行

```
bin/work/first-install-package.sh
```

無事に終了すると、yarn.lockファイルが上書きされている。

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/fd5f815a48e4415a6d5a508a7af26867b4b09eaa/spa)

## 起動

### docker-compose.yml編集

* dockerを使っているため、ワイルドカード IP アドレスで起動する.環境変数に`HOST=0.0.0.0`を設定
* portを開ける
* 作業ディレクトリで実行させる

```
    environment:
      - HOST=0.0.0.0
    working_dir: "/app/src/mypage"
    command: [yarn, dev]
    ports:
      - 3000:3000
```

### 実行

```
bin/up.sh
```

ポート3000でアクセスして、表示確認。

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/414e354f1c23489dc66b5a81f4524cc2d89ef713/spa)

## ホットリロードの確認

* windows + virtual box + dockerでは、ポーリングしてやらないとホットリロードが有効にならないので、設定を修正

### src/mypage/nuxt.config.js編集

```js
module.exports = {
  head: {/* 省略 */},
  loading: { color: '#3B8070' },
  build: {/*省略*/},
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
```

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/bca6c48747ced157e61e0d5e90a6421a7e2a6365/spa)

## axios導入

```
bin/work/add-axios.sh
```

* 通信は成功するが、consoleに表示されなかった。

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/ff1182404565a8ec83bf61e2760e26b3e034c086/spa)

## 環境変数導入

テキストではenvrcを追加したが、自分はdocker-composeを使っているので、`env_file`を追加する。

docker-compose.ymlと同じ階層に、.envrcファイルを作ってトークンを記述。
.gitignoreで.envrcファイルは管理外とする。

### .envrc

```
QIITA_TOKEN=取得したトークン
```

### docker-compose.yml
```
    env_file: .envrc
    environment:
      - HOST=0.0.0.0
```

### axos.js

githubのソースが、テキストと異なっていた。 `Bearer `が追加されている。

```
      config.headers.common['Authorization'] = `Bearer ${process.env.QIITA_TOKEN}`
```

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/7412652e9d83a012187430517dee52e59fc9b368/spa)

## head()によるHTMLメタ

* 再起動しないと、nuxt.config.jsを変更した結果は反映されない。
* ctrl + c でdocker-composeを止める
* 再度、以下のコマンド

```
./bin/up.sh
```

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/2fe3036a8ffc04d5b5a17ae8872a7ca43787be5f/spa)


## Vuexへの移譲

* サンプルはこの段階のものがgithubに上がっている

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/2764ab309b031bf1778b2d8cf76aa796413b0305/spa)

## 参考

[Nuxt.js ビギナーズガイド][*0]
[docker ip][*1]
[webpack-dev-server host][*2]
[wabpack-dev-server watch][*3]
[ホストとポート番号を変更するには？][*4]

[*0]:https://nuxt-beginners-guide.elevenback.jp/examples/
[*1]:http://docs.docker.jp/v1.11/engine/userguide/networking/default_network/binding.html
[*2]:https://github.com/vuejs/vue-cli/issues/144
[*3]:https://ja.nuxtjs.org/api/configuration-watchers/
[*4]:https://ja.nuxtjs.org/faq/host-port/

