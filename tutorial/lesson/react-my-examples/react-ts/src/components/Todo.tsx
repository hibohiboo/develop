import * as React from 'react';
import { Component, EventHandler, MouseEvent, Props} from 'react';

interface IProps extends Props<Todo>{
    onClick: EventHandler<MouseEvent<HTMLElement>>;
    completed: boolean;
    text: string;
}

interface IComponentNameState {};

export default class Todo extends Component<IProps, IComponentNameState> {
  render(): JSX.Element{
    return (<li
      onClick={this.props.onClick}
      style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}
    >
      {this.props.text}
    </li>
    );
  }
}