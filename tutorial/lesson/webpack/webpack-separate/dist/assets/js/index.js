"use strict";

var _ElmTest = require("../elm/ElmTest");

(function () {
  const tmpNode = document.getElementById('test');

  if (tmpNode === null) {
    return;
  }

  const mountNode = tmpNode;

  const app = _ElmTest.Elm.Main.init({
    node: mountNode
  });

  app.ports.log.subscribe(model => {
    console.log(model);
  });
})();