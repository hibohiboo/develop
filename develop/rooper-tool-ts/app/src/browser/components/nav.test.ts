
import * as m from 'mithril';
import { tidy } from 'mithril-jest';
import nav from './nav';

const page = {
  view: () =>
    m('div', [m(nav)]),
};

describe('nav component', () => {
  it('snapshot', () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
});
