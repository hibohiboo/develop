import React from 'react'
import { Route, IndexRoute } from 'react-router';

import CoinsShow from './containers/CoinsShow'

export default (
  <Route path="/" component={CoinsShow} >
    <IndexRoute component={CoinsShow} />
    <Route path="coins/:id" component={CoinsShow} />
  </Route>
)