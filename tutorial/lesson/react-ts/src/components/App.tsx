import * as React from 'react';

// class App extends React.Component<any, any> {
//     render() {
//         return <div> Hello World!!! </div>;
//     }
// }

// export default App;

import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <VisibleTodoList />
  </div>
)
export default App