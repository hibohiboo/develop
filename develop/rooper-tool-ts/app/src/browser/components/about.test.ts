
import * as m from 'mithril';
import { tidy } from 'mithril-jest';
import about from './about';

const page = {
  view: () =>
    m('div', [m(about)]),
};

describe('About component', () => {
  it('snapshot', () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
  it('title should be h2 with label \'このページについて\'', () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toContain('このページについて');
  });
});
