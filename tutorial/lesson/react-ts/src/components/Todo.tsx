import * as React from 'react';
import { PropTypes } from 'react';

// PropsをReact.Props<設定予定のコンポーネント>で継承して作ると補完が効く
// パラメータが足りないとエラーを吐く
interface IProps extends React.Props<Todo> {
    text: string;
}

class Todo extends React.Component<IProps, {}> {
    render() {
        return (
          <li>
            {this.props.text}
          </li>
        )
    }
}

export default Todo;