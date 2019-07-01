"use strict";

const React = require('react');
const Router = require("react-router-dom").HashRouter;
const AuthorsIndex = require('./components/authorsIndex');
const AuthorPage = require('./components/authorPage');
const NotFound = require('./components/notFound');
const Route = require("react-router-dom").Route;

class Routes extends React.Component {
  render() {
    return <Router>
      <Route exact path="/" component={AuthorsIndex} />
      <Route path="/author/:id" component={AuthorPage} />
      <Route path="*" component={NotFound} />
    </Router>;
  }
}

module.exports = Routes;