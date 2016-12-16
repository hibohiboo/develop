import * as React from 'react'; 
import {  Props, EventHandler, MouseEvent, Component } from 'react';
import Link from './Link';
import FilterLink from '../containers/FilterLink'

interface IProps {};

interface IState {};

export default class Footer extends Component<IProps, IState> {
  render(): JSX.Element{
    return (
        <p>
          Show:
          {" "}
          <FilterLink filter="SHOW_ALL">
            All
          </FilterLink>
          {", "}
          <FilterLink filter="SHOW_ACTIVE">
            Active
          </FilterLink>
          {", "}
          <FilterLink filter="SHOW_COMPLETED">
            Completed
          </FilterLink>
        </p>
      );
  }
}
