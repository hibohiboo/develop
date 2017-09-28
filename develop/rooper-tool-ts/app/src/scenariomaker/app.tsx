import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { createStore } from 'redux';
import reducers from './reducers';
import { createScenario, selectTragedySet, selectPlot, toggleCharacter, selectRole  } from './actions';
import { getTragedySet } from './services/TragedySetService';
import { TragedySetType } from './models/TragedySet';
import * as axios from 'axios';

const store = createStore(reducers);
store.dispatch(createScenario());

(async ()=>{
  const set = await getTragedySet(TragedySetType.basic);
  store.dispatch(selectTragedySet(set));
})();

/**
 * reduxフレームワークを使用。  
 * ビューはreact
 */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  // reactのコンポーネントを#root以下に作成する
  document.getElementById('root')
);
