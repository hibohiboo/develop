
## npm 依存ライブラリ

### server

```
npm i --save express
```

```
npm i --save-dev @types/express
```

#### パース

```
npm i --save body-parser 
```

## npm 開発用ライブラリ
### typescript

```
npm i --save-dev typescript
```

#### tsconfig準備

```console
npx tsc --init
```


### typescript トランスパイル - サーバテスト
```
npm i --save-dev ts-node ts-node-dev 
```
### テストツール

```
npm i --save-dev ts-jest @types/jest @types/supertest
```

## vscode インストール プラグイン

### REST Client 
* POST リクエストの応答を確認


#### 使い方
client.http のエディタ上で右クリックメニューを開き[Send Request]


### テスト用ツール Jest 
* カバレッジ出力
