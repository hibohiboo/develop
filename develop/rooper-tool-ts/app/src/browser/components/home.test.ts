
import * as m from 'mithril';
import { tidy } from "mithril-jest";
import home from './home';

const page = {
  view: () =>
    m("div", [ m(home) ])
};

describe("Home component", () => {
  it("snapshot", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
  it("title should be h2 with label 'トップ'", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toContain("トップ");
  });
});