"use strict";

const React = require('react');
const Router = require("react-router-dom").HashRouter;
const Switch = require("react-router-dom").Switch;
const AuthorsIndex = require('./components/authorsIndex');
const AuthorPage = require('./components/authorPage');
const NotFound = require('./components/notFound');
const Route = require("react-router-dom").Route;

class Routes extends React.Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={AuthorsIndex} />
        <Route path="/author/:id" component={AuthorPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>;
  }
}

module.exports = Routes;