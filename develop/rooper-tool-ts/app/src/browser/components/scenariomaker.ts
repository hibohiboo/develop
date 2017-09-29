import * as $ from 'jquery';
import * as m from 'mithril';
import nav from './nav';

class ScenarioMaker implements m.Component<{}, {}> {
  public ScenarioMaker(vnode) {

  }
  public oncreate() {

    (async ()=> {
      const a = await  $.getScript('assets/js/vendor.react.bundle.js');
      const b = await $.getScript('assets/js/scenariomaker.bundle.js');
    })()
  }
  public view() {
    return m('.page', [
      m(nav),
      m('h2', 'シナリオメーカー'),
      m('div#root'),
    ]);
  }
}

export default ScenarioMaker;
