import { combineReducers } from 'redux'
import todos from './todos'

// createStore(todos)では
// state = [todo1, todo2]
// createStore(todoApp)では
// state = {todos = [todo1, todo2]}
const todoApp = combineReducers({ todos })
export default todoApp