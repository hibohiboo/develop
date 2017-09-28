// App entry point

import * as m from 'mithril';
import about from './components/about';
import home from './components/home';
import scenariomaker from './components/scenariomaker';

m.route(document.getElementById('app') as Element, '/', {
  '/': home,
  '/about':  about,
  '/scenariomaker': scenariomaker,
});
