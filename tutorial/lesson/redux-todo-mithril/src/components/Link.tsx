import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
interface IAttr {
  props: {
    onClick: () => void;
    active: boolean;
  };
}
export default class Link implements  ClassComponent<IAttr> {
  public view({ children, attrs:{ props } }: Vnode<IAttr, this>) {
    if (props.active) {
      return <span>{children}</span>;
    }

    return (
    <a href="#" onclick={(e: Event) => {
      e.preventDefault();
      props.onClick();
    }
    }>
      {children}
    </a>);
  }
}
