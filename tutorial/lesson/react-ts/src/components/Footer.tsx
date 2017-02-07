import * as React from 'react';
import {  Component, EventHandler, MouseEvent, Props } from 'react';
import FilterLink from '../containers/FilterLink';
import Link from './Link';

interface IProps {};

interface IState {};

export default class Footer extends Component<IProps, IState> {
  render(): JSX.Element{
    return (
        <p>
          Show:
          {' '}
          <FilterLink filter="SHOW_ALL">
            All
          </FilterLink>
          {', '}
          <FilterLink filter="SHOW_ACTIVE">
            Active
          </FilterLink>
          {', '}
          <FilterLink filter="SHOW_COMPLETED">
            Completed
          </FilterLink>
        </p>
      );
  }
}
