'use strict';

require("./styles.scss");

const handouts = require('./Card/Main');
const creator = require('./Card/HandoutCreator');
const mountNode = document.getElementById('cards');
const handoutsApp = handouts.Elm.Main.init({flags: 6, node: mountNode});
const creatorApp = creator.Elm.Main.init({flags: 6, node: document.getElementById('cardCreator')});
handoutsApp.ports.toJs.subscribe(data => {
    console.log(data);
})
creatorApp.ports.toJs.subscribe(data => {
  console.log(data);
})
// Use ES2015 syntax and let Babel compile it for you
var testFn = (inp) => {
    let a = inp + 1;
    return a;
}

