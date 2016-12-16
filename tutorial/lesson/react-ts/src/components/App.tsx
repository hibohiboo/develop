import * as React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList'
import AddTodo from '../containers/AddTodo';
import Footer from './Footer'


const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;