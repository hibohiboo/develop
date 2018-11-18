"use strict";

const page2 = require('../elm/Page2.js');

const app2 = page2.Elm.Main.init({
  node: document.getElementById('test')
});
app2.ports.logout.subscribe(() => {
  console.log('test');
});