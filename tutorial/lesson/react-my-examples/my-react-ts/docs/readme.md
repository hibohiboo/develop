## 環境構築

以下で構築したフォルダ構成を参考に作成

```
npm install create-react-app
npx create-react-app my-app --typescript
```

### 設定ファイル

ie のサポートはしない予定なので設定ファイルを書換。([\*][*1])([\*\*][*2])
tsconfig.json

```diff
{
   "compilerOptions": {
-    "target": "es5",
-    "allowJs": true,
-    "skipLibCheck": true,
-    "esModuleInterop": true,
+    "target": "es6",
+    "allowJs": false,
+    "skipLibCheck": false,
+    "esModuleInterop": false,
     "allowSyntheticDefaultImports": true,
```

### redux の導入

公式の通りに導入([\*][*4])([\*\*][*5])

## 参考

[【Typescript×React】tsconfig.json の設定項目を詳しく紹介][*1]  
[tsconfig 日本語訳(3.03)][*2]
[[TypeScript] create-react-app で始めるだいたいストレスフリーな開発環境の構築 2][*3]
[Redux 開発で絶対使うべき Redux DevTools Extension 解説][*6]

[*1]: https://qiita.com/shiei_kawa/items/91a79461afa1b1549f13
[*2]: https://qiita.com/alfas/items/539ade65926deb530e0e
[*3]: https://qiita.com/Julia0709/items/dfce1eed86e82c484040
[*4]: https://react-redux.js.org/introduction/quick-start
[*5]: https://redux-docs.netlify.com/introduction/installation
[*6]: https://qiita.com/elzup/items/fc24588b2c6bae0834a6
