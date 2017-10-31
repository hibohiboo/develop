# todoにvalidationを追加する。

## 概要

前回作った、[mithril mvc](https://qiita.com/hibohiboo/items/05020a6a17ea8907d893)にバリデーションを追加する。

## 環境設定

```Dockerfile:docker/webpack/Dockerfile
FROM node:8.8.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# typescript
RUN npm i -D typescript

# tslint
RUN npm i -D tslint
RUN npm i -D tslint-config-airbnb

# typedoc
RUN npm i -D typedoc 

# ビルドツール
RUN npm i -D webpack

# 開発用サーバ
RUN npm i -D webpack-dev-server

# es6用トランスパイラ
RUN npm i -D babel-loader
RUN npm i -D babel-core
RUN npm i -D babel-cli
RUN npm i -D babel-preset-es2015
RUN npm i -D babel-preset-env
RUN npm i -D babel-plugin-transform-react-jsx
# async
RUN npm i -D babel-preset-es2017

# webpack用typescript loader
RUN npm i -D ts-loader

# jsViewライブラリmithril
RUN npm i -S mithril

# フレームワーク
RUN npm i -S redux
RUN npm i -S redux-actions
RUN npm i -S redux-saga
RUN npm i -S redux-logger

RUN npm i -S babel-polyfill

# ルーティング
RUN npm i -S page

# バリデーション
RUN npm i -S validatex
RUN npm i -S powerform

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tslint\": \"tslint -p 'tsconfig.json' --type-check\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tsc\": \"tsc -p tsconfig.json \",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"babel\": \"babel\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"typedoc\": \"typedoc\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"webpack\": \"webpack\",/g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev-server\": \"webpack-dev-server\", /g" /app/package.json
```

## ソース

```ts:src/containers/AddTodo.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import * as powerform from 'powerform';
import { required } from 'validatex';
import { addTodo } from '../actions/todos';
import { connect } from '../mithril-redux';
interface IAttr {}
function mapDispatchToProps(dispatch) {
  return {
    onClick(text: string) {
      dispatch(addTodo(text));
    },
  };
}
interface IDispatch {
  onClick(text: string): void;
}
class AddTodoComponent implements  ClassComponent<IAttr> {
  private value: string;
  private form = powerform({
    todo: [required(true)],
  },                       true);
  public view(vnode) {
    const { onClick } = vnode.attrs.props;
    return (
      <div>
        <input
          className="toggle"
          oninput={m.withAttr('value', value => this.value = value)}
          value={this.value}
        />
        <button
          onclick={
            () => {
              this.form.todo(this.value);
              if (!this.form.isValid()) { return; }
              const val = this.value;
              this.value = '';
              onClick(val); // dispatchのタイミングで画面が更新される。
            }
          }
        >
          Add Todo
        </button>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(AddTodoComponent);
```

```ts:src/containers/EditTodo.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode, VnodeDOM } from 'mithril'; // tslint:disable-line: no-duplicate-imports max-line-length
import { doneEditingTodo, editingTodo } from '../actions/todos';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';

interface IOwnProps {
  id: number;
  text: string;
  editing: boolean;
}

interface IProps extends IOwnProps {
  onDoubleClick: () => void;
  onBlur: (text: string) => void;
}

interface IAttr {
  props: IProps;
}

const mapStateToProps = (store, { text, editing }: IOwnProps) => {
  return { text, editing };
};
const mapDispatchToProps = (dispatch, { id }: IOwnProps) => {
  return {
    onDoubleClick() {
      dispatch(editingTodo(id));
    },
    onBlur(text: string) {
      dispatch(doneEditingTodo(id, text));
    },
  };
};

class EditTodoComponent implements  ClassComponent<IAttr> {
  private value: string;

  public view(vnode: Vnode<IAttr, this>) {
    const { onDoubleClick, onBlur, text, editing } = vnode.attrs.props;
    this.value = text;
    const cancelEditing = () => {
      this.value = text;
      onBlur(text);
    };
    const doneEditing = () => {
      const val = this.value;
      if (val === '') {
        return cancelEditing();
      }
      this.value = '';
      onBlur(val);
    };
    return (
      <div>
        <label ondblclick={onDoubleClick}>
          {text}
        </label>
        <input
          className="edit"
          value={this.value}
          onupdate={
            (node: VnodeDOM<{}, this>) => {
              if (editing) {
                const element = node.dom as HTMLElement;
                element.focus();
              }
            }
          }
          oninput={m.withAttr('value', value => this.value = value)}
          onblur={doneEditing}
          onkeyup={
            (e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                doneEditing();
              } else if (e.key === 'Escape') {
                cancelEditing();
              }
            }
          }
          />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTodoComponent);
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/f181c2f63fee1962ec6d4d0a0e2921eae2f5cdb3/tutorial/lesson/redux-todo-mithril)


## 参考

[Reduxでのクライアントサイドvalidationをどこでやるべきか？][*1]
[reselectを用いてReact Reduxにvalidationの仕組みを実装する 1/2][*2]
[powerform][*3]
[React + ReduxのプロジェクトでRedux Formを使ったので使い方のまとめと注意点][*4]
[Modern JavaScript概観、そしてElectronへ][*5]

[*1]:https://qiita.com/inuscript/items/5bed7812b3c1447b7b60
[*2]:https://qiita.com/notsunohito/items/76d912c5e266670f2662
[*3]:https://github.com/ludbek/powerform
[*4]:https://ichimaruni-design.com/2016/10/react-redux-form/
[*5]:https://blog.satotaichi.info/modern-javascript_201701/
