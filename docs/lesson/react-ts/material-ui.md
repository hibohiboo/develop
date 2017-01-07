# material-ui

[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(3)][*2]で作ったサンプルに、マテリアルUIを入れてみたメモ。

## ソース

```docker:webpack/Dockerfile
# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:7.3.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /my_webpack

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# jsViewライブラリreact
RUN npm i --save react
RUN npm i --save react-dom

# jsフレームワークredux
RUN npm i --save-dev redux
RUN npm i --save react-redux

# typescript
RUN npm i --save-dev typescript@next

# ビルドツール
RUN npm i --save-dev webpack@2.2.0-rc.3

# 開発用サーバ
RUN npm i --save-dev webpack-dev-server@2.2.0-rc.0

# webpack用typescript loader
RUN npm i --save-dev ts-loader

# typescriptの型定義ファイル
RUN npm i --save-dev @types/react
RUN npm i --save-dev @types/react-dom
RUN npm i --save-dev @types/redux
RUN npm i --save-dev @types/react-redux

# material-ui
RUN npm i --save material-ui
RUN npm i --save-dev @types/material-ui
RUN npm i --save react-tap-event-plugin
```

```json:webpack/package.json
{
  "name": "my_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --display-error-details",
    "start": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "material-ui": "^0.16.6",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^5.0.1",
    "react-tap-event-plugin": "^2.0.1"
  },
  "devDependencies": {
    "@types/material-ui": "^0.16.46",
    "@types/react": "^0.14.55",
    "@types/react-dom": "^0.14.20",
    "@types/react-redux": "^4.4.35",
    "@types/redux": "^3.6.0",
    "redux": "^3.6.0",
    "ts-loader": "^1.3.3",
    "typescript": "^2.2.0-dev.20170105",
    "webpack": "^2.2.0-rc.3",
    "webpack-dev-server": "^2.2.0-rc.0"
  }
}
```

```js:webpack/webpack.config.js

module.exports = {
  context: __dirname + '/src',
  entry: {
    typescript: './app.tsx',
    // code-splitting用の設定
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'material-ui', 'react-tap-event-plugin']
  },
  // 省略
};
```

`injectTapEventPlugin()`でmaterial-uiで利用しているイベントを定義。

```js:src/component/App.tsx
import * as React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList'
import AddTodo from '../containers/AddTodo';
import Footer from './Footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const MuiApp =()=>(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

export default MuiApp;
```

Add Todoボタンを ＋ アイコンのボタンに変更。

```ts:src/containers/AddTodo.tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

interface IDispatch {
  dispatch?: any;
}

let AddTodo = ({ dispatch }:IDispatch): JSX.Element => {
  let input:HTMLInputElement;

  return (
    <div>
      <input ref={(node) => {
        input = node
      }} />
      <FloatingActionButton 
        onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''
        }}
       >
        <ContentAdd />
       </FloatingActionButton>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
```

## ここの時点のソース

[github](https://github.com/hibohiboo/develop/tree/64d552421fc1ce94eaf6a0f62f1e520d8d338f4d/tutorial/lesson/react-ts)


## 参考

[material-ui][*1]  
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(3)][*2]
[webpack+React+material-uiの環境を最小手順で作成][*3]


[*1]:http://www.material-ui.com/#/get-started/installation
[*2]:http://qiita.com/hibohiboo/items/5af878b068c4d11d1b43
[*3]:http://qiita.com/takaki@github/items/724d97a20d3ae194ded4