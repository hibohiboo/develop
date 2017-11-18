// @flow
import { combineReducers } from 'redux'
import App from './containers/App/reducer'
import CartContainer from './containers/CartContainer/reducer'
import ProductById from './containers/ProductById/reducer'
import ProductsContainer from './containers/ProductsContainer/reducer'

export default combineReducers({
  App,
  CartContainer,
  ProductById,
  ProductsContainer,
})
