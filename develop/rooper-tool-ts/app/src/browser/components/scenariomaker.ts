import * as m from 'mithril';
import * as $ from 'jquery';
import nav from './nav';

class ScenarioMaker implements m.Component<{}, {}> {
  TragedySetForm(vnode) {

  }
  oncreate() {
    console.log('oncreate')
    $.getScript( "assets/js/vendor.react.bundle.js", function( data, textStatus, jqxhr ) {
      console.log( textStatus ); // Success
      console.log( jqxhr.status ); // 200
      console.log( "Load was performed. vendor" );
    }).then(function(){
      $.getScript( "assets/js/scenariomaker.bundle.js", function( data, textStatus, jqxhr ) {
        console.log( textStatus ); // Success
        console.log( jqxhr.status ); // 200
        console.log( "Load was performed. scenariomaker" );
      })
    });
  }
  view() {
    return m('.page', [
      m(nav),
      m('h2', 'シナリオメーカー'),
      m('div#root'),
    ]);
  }
}

export default ScenarioMaker;
