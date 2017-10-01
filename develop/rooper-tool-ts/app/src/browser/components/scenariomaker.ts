import * as $ from 'jquery';
import * as m from 'mithril';
import nav from './nav';

class ScenarioMaker implements m.Component<{}, {}> {
  public ScenarioMaker(vnode) {

  }
  public oncreate() {

    (async ()=> {
      await $.getScript('assets/js/vendor.react.bundle.js');
      await $.getScript('assets/js/scenariomaker.bundle.js');
      console.log('scenario loaded')
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
