import * as React from 'react'; 
import {  Props, EventHandler, MouseEvent, Component } from 'react';

interface IProps extends Props<Link>{
    children?: React.ReactElement<any>[];
}

interface IState {};

export default class Link extends Component<IProps, IState> {
  render(): JSX.Element{
    return (<a href="#">{this.props.children}</a>);
  }
}
