# Redux ExampleのTodo ListをはじめからていねいにをElmで
## 概要

[Redux ExampleのTodo Listをはじめからていねいに(1)][*1]を以下のパターンで試した。

* [Redux ExampleのTodo ListをはじめからていねいにVue.jsで(1)][*2]
* [Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*3]
* [MithrilのTodo ListをはじめからていねいにTypescriptで(1)][*4]
* [Mithril + Redux のTodo ListをTypescriptで(1)][*5]

Elmでも同様の手順で試してみる。

ExampleのTodo Listの機能は次の3つ。

1. TodoをTodo Listに追加する「Add Todo」
1. Todoの完了・未完了を切り替える「Toggle Todo」
1. 表示するTodo Listを完了または未完了のTodoだけにする「Filter Todo」

## 環境

* Windows 10
* Vagrant 2.2.5
* virtualbox 6.0.10
* Ubuntu 18.04 LTS (Bionic Beaver)
* Docker version 18.09.5, build e8ff056
* docker-compose version 1.24.0, build 0aa59064

仮想環境のIPは192.168.50.10に指定。

ブラウザはchromeで確認。

## ディレクトリ構成(Hello world時)

```
.
├── bin
├── docker
│   ├── config
│   ├── docker-compose.yml
│   │   ├── babel.config.js
│   │   └── webpack.config.js
│   └── elm-todo
│       └── Dockerfile
├── elm.json
├── public
│   └── index.html
└── src
    ├── Main.elm
    └── index.js
```


[この時点のソース](https://github.com/hibohiboo/develop/tree/4c52628895100996f09775b8b631ca65b87e5b1c/tutorial/lesson/elm/elm-todo)

## ビルドツール

```dockerfile:docker/elm-todo/Dockerfile
FROM node:12.10.0
# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

## for js
### babel
RUN yarn add --dev @babel/core \
  @babel/preset-env

RUN yarn add --dev @babel/cli

## elm
RUN yarn add --dev elm
RUN yarn add --dev elm-format
RUN yarn add --dev elm-minify
RUN yarn add --dev elm-webpack-loader

RUN yarn add --dev elm-test

## webpackインストール
RUN yarn add --dev webpack
RUN yarn add --dev webpack-cli
RUN yarn add --dev webpack-dev-server

## plugin
RUN yarn add --dev copy-webpack-plugin
RUN yarn add --dev html-webpack-plugin

### loaders
RUN yarn add --dev babel-loader
RUN yarn add --dev html-loader
RUN yarn add --dev elm-webpack-loader
RUN yarn add --dev elm-hot-webpack-loader
```

```yaml:docker/docker-compose.yml
version: '3'
services:
  elm-todo:
    build: ./elm-todo
    volumes:
      - ../src:/app/src
      - ../public:/app/public
      - ../dist:/app/dist
      - ../elm.json:/app/elm.json
      - ./config/webpack.config.js:/app/webpack.config.js
      - ./config/babel.config.js:/app/babel.config.js
      # packageのキャッシュ
      - cacheGardenElmStuffStarter:/app/elm-stuff
      - cacheGardenDotElmStarter:/root/.elm
    ports:
      - 3000:3000
    command: [yarn, webpack-dev-server, --hot, --colors, --port, '3000', --host, '0.0.0.0', ]

volumes:
  # elmのpackageを毎回ダウンロードしなくてもよいように、キャッシュを行う。2か所のキャッシュが必要。
  cacheGardenElmStuffStarter: 
  cacheGardenDotElmStarter:
```

```js:docker/config/babel.config.js
const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'entry',
    },
  ],
];

// sourceType: scriptにしないと、babelが グローバルの this を void 0 に変えてしまう
const overrides = [{
  test: /Main\.js$/,
  sourceType: 'script',
}];
module.exports = { presets, overrides };
```

```js:docker/config/webpack.js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      chunks: ['index'],
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.elm'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: 'elm-hot-webpack-loader' },
          {
            loader: 'elm-webpack-loader',
            options: {
              debug: false,
              forceWatch: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    progress: true,
    inline: true,
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};
```

```json:elm.json
{
  "type": "application",
  "source-directories": [
    "src"
  ],
  "elm-version": "0.19.0",
  "dependencies": {
    "direct": {
      "elm/browser": "1.0.1",
      "elm/core": "1.0.2",
      "elm/html": "1.0.0",
      "elm/json": "1.1.3"
    },
    "indirect": {
      "elm/time": "1.0.0",
      "elm/url": "1.0.0",
      "elm/virtual-dom": "1.0.2"
    }
  },
  "test-dependencies": {
    "direct": {},
    "indirect": {}
  }
}
```

```html:public/index.html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Todo</title>
</head>

<body>
  <div id="app"></div>
</body>

</html>
```

```shell:bin/up.sh
#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker
composeFile=${1:-"docker-compose.yml"}

# docker-composeの起動
cd $docker_dir && docker-compose -f $composeFile up
```


## Add Todo

### 1. Hello World
まずはHellow Worldを表示させる。

```js
import { Elm } from './Main';

const flags = {};

// elmのＤＯＭを作成する元となるＤＯＭ要素
const mountNode = document.getElementById('app');

// 初期値を与える
const app = Elm.Main.init({ node: mountNode, flags });
```

```elm:src/Main.elm
module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as D exposing (Value)

main : Program Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

type alias Model =
    { message : String
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model "Hello World", Cmd.none )



type Msg
    = Nothing


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Nothing ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch []


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text model.message ]
        ]
```

これでHello Worldが表示できる。
dockerを起動するshellは以下。

```console
bin/up.sh
```

以下のURLで、 Hellow worldが表示されているのを確認できる。
http://192.168.50.10:3000/


### 2. 発行したメッセージをupdateに渡してModelを更新する
#### Model
アプリケーションが管理すべき状態を表したもの。
ReduxだとStoreにあたる。

```elm
type alias Model =
    { id: Int,
    text: String
    }

init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model 0 "test", Cmd.none )

```

#### Update
UpdateはModelを更新する関数となる。
メッセージを受け取ってModelを更新する。
ReduxでいえばReducerにあたる。
メッセージは慣習的にMsgというカスタム型で表す。
ReduxでいえばActionにあたる。

```elm
type Msg
    = AddTodo String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddTodo text ->
            (Model 0 text , Cmd.none )
```

ここまでで、msg -> update -> modelの一連の流れができた。
実際にModelが更新されるのを見てみる。

```elm
init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model 0 "", addNewTodo )


addNewTodo : Cmd Msg
addNewTodo =
    Task.perform AddTodo (Task.succeed "Hello World!")
```

まず、initでmodel: { id = 0, text = "" }となる。
つぎに、addNewTodoがAddTodoのメッセージを発行する。
updateでModelが更新され、model: { id = 0, text = "Hello World!" }となる。
デバッグメッセージをコンソールにだして確認してみる。

```elm
view : Model -> Html Msg
view model =
    let
        _ =
            Debug.log "model" model
    in
    div []
        [ text "Hello World"
        ]
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/331ffdd49ce9fdbfc458f275b6f4706252f8ab20/tutorial/lesson/elm/elm-todo)


### 3. Modelで保持したstateをViewで表示する
#### Todo Listの作成
viewで表示する前に、少しだけModelを書き換える。
Modelでtodoを保持することはできたが、このままでは1つのtodoしか保持できない。
複数のtodoを保持できるよう拡張する。

```elm

type alias Todo =
    { id : Int
    , text : String
    }


type alias Model =
    { todos : List Todo
    }


init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model [], Cmd.none )


type Msg
    = AddTodo String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddTodo text ->
            ( { model | todos = Todo (List.length model.todos) text :: model.todos }, Cmd.none )
```

updateが少し長くなってしまったので分割してみてみる。

```elm
List.length model.todos
```

この部分は、リストの長さを出している。登録するごとに、idは1つずつ増えていく。

```elm
Todo (List.length model.todos) text
```

この部分は、新しいTodoオブジェクトを作成している。
type alias Todoにより、Todo Int Stringの形式で、Todoオブジェクトを作るコンストラクタが自動的に生成されている。

```elm
todo :: model.todos
```

この部分はListの先頭にTodoオブジェクトを追加した新しいListを作成している。


```elm
{model | todos = todos}
```

この部分は、Modelのtodosを更新した新しいModelを作成している。



#### View
Modelを元にHTMLを作成する。

##### ToDoのビューとTodoListのビューを作る。

Todoは渡されてきたtextを表示するだけとする。

```elm
todo : Todo -> Html Msg
todo t =
    li [] [ text t.text ]
```

todoListはTodoをtodoに渡すものとする。

```elm
view : Model -> Html Msg
view model =
    div []
        [ todoList model.todos
        ]

todoList : List Todo -> Html Msg
todoList todos =
    ul [] (List.map todo todos)

```

まだTodoを追加するフォームはないので、手動でtodoを追加。

```elm
init : Value -> ( Model, Cmd Msg )
init flags =
    ( Model [], Cmd.batch [ addNewTodo, addNewTodo2 ] )


addNewTodo : Cmd Msg
addNewTodo =
    Task.perform AddTodo (Task.succeed "Hello World!")


addNewTodo2 : Cmd Msg
addNewTodo2 =
    Task.perform AddTodo (Task.succeed "Hello Elm!")
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/ed16d7502dbd0dddfc26577f9a1b902ffacb9e3f/tutorial/lesson/elm/elm-todo)

##### パフォーマンスの最適化を行う

Reactでも配列を扱うときは、パフォーマンスのためにkeyを指定する。
elmも同様な仕組みがあるので導入する。

```elm
view : Model -> Html Msg
view model =
    div []
        [ lazy todoList model.todos
        ]


todoList : List Todo -> Html Msg
todoList todos =
    Keyed.node "ul" [] (List.map keyedTodo todos)


keyedTodo : Todo -> ( String, Html Msg )
keyedTodo t =
    ( String.fromInt t.id, todo t )


todo : Todo -> Html Msg
todo t =
    li [] [ text t.text ]
```



### 4. フォームからtodoを追加
フォームからtodoを追加できるようにする。
入力内容を保存する状態をModelに追加する。

```elm

type alias Model =
    { todos : List Todo
    }
```




## 参考

[Redux ExampleのTodo Listをはじめからていねいに(1)][*1]
[Redux ExampleのTodo ListをはじめからていねいにVue.jsで(1)][*2]
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*3]
[MithrilのTodo ListをはじめからていねいにTypescriptで(1)][*4]
[Mithril + Redux のTodo ListをTypescriptで(1)][*5]
[Elmの公式ガイド][*6]

[*1]:https://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3
[*2]:https://qiita.com/hibohiboo/items/e3030350ecc83cb2c3bc
[*3]:https://qiita.com/hibohiboo/items/e344d2bbbaaab0ba8a66
[*4]:https://qiita.com/hibohiboo/items/7ae89f840302882cf1d3
[*5]:https://qiita.com/hibohiboo/items/335ba837425978eb5f4a
[*6]:https://guide.elm-lang.jp/install.html
