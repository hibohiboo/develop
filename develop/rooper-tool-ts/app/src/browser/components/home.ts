import * as m from 'mithril';
import nav from './nav';

const component: m.Component<{}, {}> = {
  view(vnode) {
    return m('.page', [
      m(nav),
      m('h2', 'トップ'),
      m('p', '惨劇ルーパーオンラインツールへようこそ.'),
    ]);
  },
};

export default component;
