import * as m from 'mithril';

const component: m.Component<{}, {}> =  {
  view(vnode) {
    return m('div',
             m('a', { href: '/', oncreate: m.route.link }, 'Home'),
             m('span', ' | '),
             m('a', { href: '/about', oncreate: m.route.link }, 'About'),
             m('span', ' | '),
             m('a', { href: '/scenariomaker', oncreate: m.route.link }, 'シナリオ作成'),
            );
  },
};
export default component;
