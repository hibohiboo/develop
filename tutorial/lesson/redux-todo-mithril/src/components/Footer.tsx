import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
import Link from './Link';

interface IAttr {}

export default class Footer implements  ClassComponent<IAttr> {
  view({children}: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
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