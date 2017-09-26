## 三原則
 
* Single source oftruth
* State is read-only
* Changes are made with pure functions

* アプリケーション全体のstateはひとつのstoreの中のobjectツリーに格納されます。
* action（何が起こるか記述されているオブジェクト）を発火することが、stateを更新する唯一の方法です。
* sstateがactionによってどのように変更されるか指定するために、純粋な（副作用のない）reducerを書きます。

## Store

* アプリケーションの状態（state）を保持します
* getState()メソッドを通して状態（state）へのアクセスを許可します
* dispatch(action)メソッドを通して状態（state）の更新を許可します
* subscribe(listener)メソッドを通してリスナーを登録します
* subscribe(listener)メソッドによって返された関数を通してリスナーの登録解除をハンドリングします

## Component

### Container components
機能に関するコンポーネント。  
いわゆるFluxでいうContainerです。
主に直接Reduxと連携するコンポーネントで、ReduxのStoreの状態（state）を購読し、
またReduxのActionをDispatchする役割を持ち、データを取得したり、stateの更新を行ったりします。
主に親コンポーネントがこの役割を担います。

### Presentational components
見た目に関するコンポーネント。  
Container componentsからpropsを通してデータを受け取り、Viewを構築します。
また同様にpropsから受け取ったコールバックを実行します。

## 参考

[Reduxの実装とReactとの連携を超シンプルなサンプルを使って解説][*1]
[github redux-sample][*2]

[*1]:http://mae.chab.in/archives/2885
[*2]:https://github.com/maechabin/redux-sample