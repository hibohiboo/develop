// @flow
import type { State as App } from '../containers/App/reducer'
import type { State as CartContainer } from '../containers/CartContainer/reducer'
import type { State as ProductById } from '../containers/ProductById/reducer'
import type { State as ProductsContainer } from '../containers/ProductsContainer/reducer'

export type State = {
  App: App,
  CartContainer: CartContainer,
  ProductById: ProductById,
  ProductsContainer: ProductsContainer,
}
