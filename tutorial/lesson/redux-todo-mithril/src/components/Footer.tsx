import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
import { ACTIVE, ALL, COMPLETED } from '../actions/filter';
import FilterLink from '../containers/FilterLink';

interface IAttr {}

export default class Footer implements  ClassComponent<IAttr> {
  public view({ children }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (
      <p>
      Show:
      {' '}
      <FilterLink filter={ALL}>
        All
      </FilterLink>
      {', '}
      <FilterLink filter={ACTIVE}>
        Active
      </FilterLink>
      {', '}
      <FilterLink filter={COMPLETED}>
        Completed
      </FilterLink>
    </p>

    );
  }
}
