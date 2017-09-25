# testについて

## 前提条件

`up-d.sh`を実行して、バックグラウンドでサーバを立ち上げておく。

## 単体テスト

ソースのロジックを確認するテスト。
`bin/jest.sh`で実行。
実行後、http://192.168.50.10/coverage/にアクセス。単体テストの結果を確認する。
単体テストは、ソースコードのファイル`hoge.ts`と同じディレクトリに`hoge.test.ts`を作成すること。

### スナップショットテスト

コードを実行した際のHTMLを保存しておいて、差異をチェックするテスト。
変更点が問題なければ、`bin/jest.sh --updateSnapshot`で更新する。

## end to end (e2e)テスト

ブラウザで行うテスト。
`tests/e2e/`フォルダにテストコードを作成する。
`e2e.js`を実行する。
スクリーンショットは`dist/screenshots`ディレクトリに保存される。

### e2eテストの実行の様子の確認方法

実行の様子は、リモートデスクトップで確認できる。

`vncviewer64-1.8.0.exe`を実行。
`192.168.50.10:15900`を入力してconnectボタンを押す。
パスワードの入力欄が出るのでsecretと入力。
自動実行がはじまるとブラウザがvncviewerのリモートデスクトップで開く。

## 参考

[tigervnc][*1]  
[生まれ変わったFacebook製テストフレームワーク「Jest」とは何か？][*3]  
[ts-jest][*2]   
[jest][*4]  
[jestでテストカバレッジを見る][*5]
[mithril-jest][*6]

[*1]:https://bintray.com/tigervnc/stable/tigervnc/1.8.0
[*2]:https://github.com/kulshekhar/ts-jest
[*3]:https://www.webprofessional.jp/test-react-components-jest-1/
[*4]:https://facebook.github.io/jest/docs/en/getting-started.html
[*5]:https://qiita.com/monisoi/items/44931e36c5f7b1f4e683
[*6]:https://github.com/ArthurClemens/mithril-jest
[*7]:https://facebook.github.io/jest/docs/ja/snapshot-testing.html
