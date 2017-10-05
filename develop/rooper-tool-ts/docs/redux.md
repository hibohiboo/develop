# redux

## 基本

データの流れを一方向にする。

dispatch(action) -> reducer - new state -> store -> connected component

## redux-saga

非同期処理が来た時のために、タスクという概念を追加する。

## 参考

[redux-sagaで非同期処理と戦う][*3]  
[redux-actions][*5]  
[connectを試す][*6]  
[redux図解][*7]

[*1]:http://grandbig.github.io/blog/2017/01/02/redux-base-4/
[*2]:https://github.com/colinbate/mithril-redux-starter/blob/master/src/actions.js
[*3]:https://qiita.com/kuy/items/716affc808ebb3e1e8ac
[*4]:https://github.com/redux-saga/redux-saga/blob/master/README_ja.md
[*5]:https://qiita.com/yasuhiro-okada-aktsk/items/a14f7f37262fb6cf0bf8
[*6]:https://qiita.com/MegaBlackLabel/items/df868e734d199071b883
[*7]:https://qiita.com/mpyw/items/a816c6380219b1d5a3bf