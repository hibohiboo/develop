### zeit now へのデプロイを確認

- 事前に、zeit へ github 連携を行っている。
- コンテナに bin/bash.sh でログイン。以下のコマンドを実行してデプロイしてみる。

```bash
now login # メールを確認する。メールは https://zeit.co/account の画面から確認可能
now init # nextjsのデフォルトプロジェクトを作成
cd nextjs # initで作ったディレクトリに移動する
now # デプロイを行う。とりあえず、初期の状態でデプロイできることを確認
```

- このとき、/root/.local/share/now/ディレクトリに、config.json と auth.json が出来ているので、コンテナ外に保存しておく。認証用の情報
- nextjs フォルダに最初のファイルが出来ているので、コンテナ外に保存しておく。
- コンテナ作成時に、/root/.local/share/now/ディレクトリに先ほど保存したファイルを取り込むように Dockerfile を修正。
  - 毎回、now login しなくてもよいようになる。

[整理前のソース](https://github.com/hibohiboo/develop/tree/11d6d6ee33cdaac6687fc32217ad40386dceb9e8/tutorial/lesson/react-my-examples/next/)

### フォルダ構造変更

- src ファイル整理
- `now dev`でローカルで確認できるように docker-compose.yml を修正

[この時点のソース](https://github.com/hibohiboo/develop/tree/fa5d3cce8b733e7ee3ec89a48c3a265f712c4881/tutorial/lesson/react-my-examples/next/)

### 環境構築

[2020 年初頭における Next.js をベースとしたフロントエンドの環境構築][*1] を参考に環境を作っていく。
Next.js のインストールまではできているので、続きから。

- フレームワーク： Next.js v9.3.1 (React v16.13.1)
- 静的型付け： TypeScript v3.8.3
- PWA： next-offline v5.0.0
- スタイリング： styled-components v5.0.1 + styled-media-query v2.1.2
- 状態管理： Redux Toolkit v1.2.5
- ルール＆整形： EditorConfig + ESLint v6.8.0 + Prettier v1.19.1
- テスト： Jest v25.1.0 + React Testing Library v9.4.1
- コンポーネントカタログ: Stroybook v5.3.14 (StoryShots を含む)

#### TypeScript

- とりあえず追加時まで
  [この時点のソース](https://github.com/hibohiboo/develop/tree/894afc97b8b27e1a24f9e561146438278956ce39/tutorial/lesson/react-my-examples/next/)

#### Next.js の App と Document のコンポーネントをオーバーライド

[この時点のソース](https://github.com/hibohiboo/develop/tree/339f325f65d4403882c5d20dfeea681d60e4bd42/tutorial/lesson/react-my-examples/next/)

#### PWA に対応

- [manifest.json ジェネレータで作成](https://app-manifest.firebaseapp.com/)
  - アプリ名
  - 作者
  - アイコン

[この時点のソース](https://github.com/hibohiboo/develop/tree/db933aaf900b43049da8dee38cd812b2a353c8e6/tutorial/lesson/react-my-examples/next/)

### styled components を追加

- Next.js には初期設定で styled-jsx が含まれる
- styled-components の方が人気があるのでそちらを使用

[この時点のソース](https://github.com/hibohiboo/develop/tree/bd6587bff1a6eb19e2a1370955de6bc66dcf5438/tutorial/lesson/react-my-examples/next/)

### Redux Toolkit

[この時点のソース](https://github.com/hibohiboo/develop/tree/66e005ff8d9a3de36649f541ccd007c59bc5bce3/tutorial/lesson/react-my-examples/next/)

### EditorConfig と ESLint と Prettier を追加

[この時点のソース](https://github.com/hibohiboo/develop/tree/84d37ee5bb84deb17ee299b45dc0f6d79cd17a27/tutorial/lesson/react-my-examples/next/)

### Jest と React Testing Library を追加

### story book を追加

./bin/bash.sh でログインして以下。

```bash
npx -p @storybook/cli sb init --type react
cp -r stories build/
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/107f07572c1d04c5ff5e2238419b6b4ce7171a9e/tutorial/lesson/react-my-examples/next/)
※ snapshot.sh は動かない。（http://localhostに繋がらないエラーが出る） （そもそも localhost に storybook を立てているときに動かすもよう https://www.npmjs.com/package/@storybook/addon-storyshots-puppeteer）

## 参考

### now

[dist now](https://zeit.co/onboarding)
[設定なしでデプロイできる Zeit Now](https://dev.classmethod.jp/server-side/serverless/zero-configuration-zeit-now/)
[Now でクラウドの複雑さから解放されよう、今すぐに](https://qiita.com/aggre/items/f0cb9f8b8e8c54768e50)
[example](https://github.com/zeit/now/tree/master/examples/nextjs)
[now deploy](https://zeit.co/docs/v2/platform/deployments#now-cli)

### next

[2020 年初頭における Next.js をベースとしたフロントエンドの環境構築][*1]

[*1]: https://qiita.com/syuji-higa/items/931e44046c17f53b432b

### react

[styled-components を使った CSS 設計](https://qiita.com/taneba/items/4547830b461d11a69a20)

### pupeteer

[](https://techracho.bpsinc.jp/ebi/2019_12_11/76458)
[Docker + docker-compose + puppeteer でスクレイピングしてみた](https://qiita.com/takayuki-miura0203/items/4fa4cdc9ef0c07a857a9)
