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

## 履歴

[vm追加時点ソース](https://github.com/hibohiboo/develop/tree/05d866588b0ab24da206a4c939135a67f773db89/tutorial/lesson/dotnet/todo/)

## 参考
[dotnet 2.2メモ](https://qiita.com/hibohiboo/items/1d1b5922b3e1de23dffa)
[dotnet 2.2チュートリアル](https://qiita.com/hibohiboo/items/72c1e684533526835d61)
