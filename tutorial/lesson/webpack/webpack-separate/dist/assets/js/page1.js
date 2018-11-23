"use strict";

const {
  Elm
} = require('./Page1.elm.js');

const mountNode = document.getElementById('test');
const app = Elm.Main.init({
  node: mountNode
});
app.ports.logout.subscribe(() => {
  console.log('tes1t');
});