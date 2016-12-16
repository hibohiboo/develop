import * as React from 'react'; 
import {  Props, EventHandler, MouseEvent, Component } from 'react';
import Link from './Link';

interface IProps {};

interface IState {};

export default class Footer extends Component<IProps, IState> {
  render(): JSX.Element{
    return (
      <p>
        Show:
        {" "}
        <Link>
          All
        </Link>
        {", "}
        <Link>
          Active
        </Link>
        {", "}
        <Link>
          Completed
        </Link>
      </p>
      );
  }
}
