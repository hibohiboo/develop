"use strict";

const {
  Elm
} = require('../elm/Page1.js');

const mountNode = document.getElementById('test');
const app = Elm.Main.init({
  node: mountNode
});
app.ports.logout.subscribe(() => {
  console.log('test');
});