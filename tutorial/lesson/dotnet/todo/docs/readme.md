## 概要

asp.net coreでTODOアプリを作成する。
2.2から3.xにアップデートするマイグレーションも試してみたい。

## TODOリスト
* 基本のTODOリスト
  * 環境作成
    * Visual Studio 2019
  * 環境作成 - dotnet
    * vmの作成
    * dockerの導入
    * dotnetの動作確認
  * SPAの表示
    * MVCのページ作成
    * SPAのページ作成
      * vueの導入
  * 環境作成 - SQL
    * SQL Serverの導入
  * TODOのDB作成
  * CRUDのAPI作成
    * SQL Serverへの接続
  * vue側からのAPI呼出

* ログイン可能なTODOリスト
  * firebaseのAuthの導入
  * フロントでログインページ作成
  * API側で認証の作成
* テストコード
  * vue
  * api
* 2.xから3.xへのアップデート
  * vue
  * dotnet

## 基本のTODOリスト
### 開発環境
* chocolateyは[次のドキュメント](../virtual-environment/docs/readme)と同様にインストールしておく。

```
cinst visualstudio2019community -y
```

### 環境作成 - SQL

dockerを起動

```
vagrant ssh
```

```
cd /vagrant/virtual-environment/
./bin/up.sh
```


dockerを起動後、 ssms でsql/create_db.sql,create_todo_database.sqlのクエリを実行

### Entity Framework

SQLからモデルを作成するために以下のツールをインストール

```
cinst dotnetcore-sdk -y
```
```
dotnet tool update --global dotnet-ef
```

### DBからモデルの作成

```
sh ./bin/create_from_db.sh
```

以下が表示され、Models以下にアイテムが作成されていれば成功

```
Build started...
Build succeeded.
```



## 履歴

[vm追加時点ソース](https://github.com/hibohiboo/develop/tree/05d866588b0ab24da206a4c939135a67f773db89/tutorial/lesson/dotnet/todo/)
[プロジェクト追加時点](https://github.com/hibohiboo/develop/tree/a782224eb21c2863b6f317d1d847d1580de92858/tutorial/lesson/dotnet/todo/)
[vue.js 表示時点](https://github.com/hibohiboo/develop/tree/2d3881f63c82b41585fb72a53213aa91d03d9e6d/tutorial/lesson/dotnet/todo/)

## 参考
[dotnet 2.2メモ](https://qiita.com/hibohiboo/items/1d1b5922b3e1de23dffa)
[dotnet 2.2チュートリアル](https://qiita.com/hibohiboo/items/72c1e684533526835d61)

[コマンドいらず！VisualStudioでASP.NET Coreと Angularのひな形を作る](https://qiita.com/SuyamaDaichi/items/a9592bb6b6ee0cb396a4)
[api チュートリアル](https://docs.microsoft.com/ja-jp/aspnet/core/tutorials/first-web-api?view=aspnetcore-2.2&tabs=visual-studio)
[Laradock でLaravel + SQLServerの環境を用意する](https://qiita.com/itito/items/f1cfb2a26ac0e52ecc64)
[クイック スタート:Docker を使用して SQL Server コンテナー イメージを実行する](https://docs.microsoft.com/ja-jp/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)
[主キーの作成](https://docs.microsoft.com/ja-jp/sql/relational-databases/tables/create-primary-keys?view=sql-server-ver15)
[EntityFramework CoreのDatabase First Approachで、Modelを作成する](https://qiita.com/takanemu/items/ebca534db398aa9cce34)
[Entity Framework Core ツールリファレンス-.NET Core CLI](https://docs.microsoft.com/ja-jp/ef/core/miscellaneous/cli/dotnet)