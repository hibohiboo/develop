import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
interface IAttr {
  props: {
    active: boolean;
    filter: string;
  };
}
export default class Link implements  ClassComponent<IAttr> {
  public view({ children, attrs:{ props } }: Vnode<IAttr, this>) {
    if (props.active) {
      return <span>{children}</span>;
    }

    return (
    <a href={`/#${props.filter}`} >
      {children}
    </a>);
  }
}
