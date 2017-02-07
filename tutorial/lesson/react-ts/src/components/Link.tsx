import * as React from 'react';
import {  Component, Props } from 'react';

interface ILinkProps extends Props<Link>{
    children?: any;
    active: boolean;
    onClick: Function;
}
interface ILinkState {};

class Link extends Component<ILinkProps, ILinkState> {
  render(): JSX.Element{
    if (this.props.active) {
      return <span>{this.props.children}</span>;
    }

    return (
      <a href="#"
         onClick={(e) => {
           e.preventDefault();
           this.props.onClick();
         }}
      >{this.props.children}</a>
    );
  }
}

export default Link;