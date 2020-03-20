* コンテナにbin/bash.shでログインして、以下のコマンドを実行してデプロイしてみる。

```
now login
now init
cd nextjs
now
```

* このとき、/root/.local/share/now/ディレクトリに、config.jsonとauth.jsonが出来ているので、保存しておく。認証用の情報
* nextjsフォルダに最初のファイルが出来ているので、保存しておく。
* コンテナ作成時に、/root/.local/share/now/ディレクトリに先ほど保存したファイルを取り込むようにDockerfileを修正。


## 参考
### now
[dist now](https://zeit.co/onboarding)
[設定なしでデプロイできるZeit Now](https://dev.classmethod.jp/server-side/serverless/zero-configuration-zeit-now/)
[Now でクラウドの複雑さから解放されよう、今すぐに](https://qiita.com/aggre/items/f0cb9f8b8e8c54768e50)
[example](https://github.com/zeit/now/tree/master/examples/nextjs)
[now deploy](https://zeit.co/docs/v2/platform/deployments#now-cli)
### next
[2020年初頭における Next.js をベースとしたフロントエンドの環境構築](https://qiita.com/syuji-higa/items/931e44046c17f53b432b)