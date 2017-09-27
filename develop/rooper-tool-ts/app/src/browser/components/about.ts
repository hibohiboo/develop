import * as m from 'mithril';
import nav from './nav';

const component: m.Component<{}, {}> = {
  view(vnode) {
    return m('.page', [
      m(nav),
      m('h2', 'このページについて'),
      m('p', '惨劇RoopeRをオンラインで遊ぶツールです。'),
    ]);
  },
};

export default component;
