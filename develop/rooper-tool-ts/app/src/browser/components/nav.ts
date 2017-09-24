import * as m from 'mithril';

const component: m.Component<{}, {}> =  {
  view(vnode) {
    return m('div',
             m('a', { href: '/', oncreate: m.route.link }, 'Home'),
             m('span', ' | '),
             m('a', { href: '/about', oncreate: m.route.link }, 'About'),
    );
  },
};
export default component;
