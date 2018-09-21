import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// 最終的なstoreの値は
// {todos: [todo1, todo2, ...], visibilityFilter: 'SHOW_ALL'}
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
export default todoApp



