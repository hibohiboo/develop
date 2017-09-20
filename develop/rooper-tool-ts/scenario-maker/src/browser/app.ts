// App entry point

import * as m from 'mithril';
import about from './components/about';
import home from './components/home';

m.route(document.getElementById('root'), '/', {
  '/': home,
  '/about': about,
});
