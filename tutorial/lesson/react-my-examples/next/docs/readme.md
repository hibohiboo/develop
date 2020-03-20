### zeit nowへのデプロイを確認
* 事前に、zeitへgithub連携を行っている。
* コンテナにbin/bash.shでログイン。以下のコマンドを実行してデプロイしてみる。

```bash
now login # メールを確認する。メールは https://zeit.co/account の画面から確認可能
now init # nextjsのデフォルトプロジェクトを作成
cd nextjs # initで作ったディレクトリに移動する
now # デプロイを行う。とりあえず、初期の状態でデプロイできることを確認
```

* このとき、/root/.local/share/now/ディレクトリに、config.jsonとauth.jsonが出来ているので、コンテナ外に保存しておく。認証用の情報
* nextjsフォルダに最初のファイルが出来ているので、コンテナ外に保存しておく。
* コンテナ作成時に、/root/.local/share/now/ディレクトリに先ほど保存したファイルを取り込むようにDockerfileを修正。
  * 毎回、now login しなくてもよいようになる。

[整理前のソース](https://github.com/hibohiboo/develop/tree/11d6d6ee33cdaac6687fc32217ad40386dceb9e8/tutorial/lesson/react-my-examples/next/)

### フォルダ構造変更
* srcファイル整理
* `now dev`でローカルで確認できるようにdocker-compose.ymlを修正

[この時点のソース](https://github.com/hibohiboo/develop/tree/fa5d3cce8b733e7ee3ec89a48c3a265f712c4881/tutorial/lesson/react-my-examples/next/)

### 環境構築
[2020年初頭における Next.js をベースとしたフロントエンドの環境構築][*1] を参考に環境を作っていく。
Next.jsのインストールまではできているので、続きから。

* フレームワーク： Next.js v9.3.1 (React v16.13.1)
* 静的型付け： TypeScript v3.8.3
* PWA： next-offline v5.0.0
* 状態管理： Redux Toolkit v1.2.5
* ルール＆整形： EditorConfig + ESLint v6.8.0 + Prettier v1.19.1
* テスト： Jest v25.1.0 + React Testing Library v9.4.1
* コンポーネントカタログ: Stroybook v5.3.14 (StoryShots を含む)

#### TypeScript


## 参考
### now
[dist now](https://zeit.co/onboarding)
[設定なしでデプロイできるZeit Now](https://dev.classmethod.jp/server-side/serverless/zero-configuration-zeit-now/)
[Now でクラウドの複雑さから解放されよう、今すぐに](https://qiita.com/aggre/items/f0cb9f8b8e8c54768e50)
[example](https://github.com/zeit/now/tree/master/examples/nextjs)
[now deploy](https://zeit.co/docs/v2/platform/deployments#now-cli)
### next
[2020年初頭における Next.js をベースとしたフロントエンドの環境構築][*1]

[*1]:https://qiita.com/syuji-higa/items/931e44046c17f53b432b
