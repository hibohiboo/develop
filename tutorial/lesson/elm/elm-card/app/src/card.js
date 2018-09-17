'use strict';

require("./styles.scss");

const handouts = require('./Card/Main');
const creator = require('./Card/HandoutCreator');

const handoutsApp = handouts.Elm.Main.init({flags: 0, node: document.getElementById('cards')});
const creatorApp = creator.Elm.Main.init({flags: null, node: document.getElementById('cardCreator')});

creatorApp.ports.toJs.subscribe(data => {
  const json = JSON.stringify(data);
  handoutsApp.ports.fromJs.send(json);
})

