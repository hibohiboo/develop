"use strict";

require("../css/index.css");

var _ElmTest = require("../elm/ElmTest");

// cssを読み込む。（実際にはwebpackで分離される)
(function () {
  const tmpNode = document.getElementById('test');

  if (tmpNode === null) {
    return;
  }

  const mountNode = tmpNode;

  const app = _ElmTest.Elm.Main.init({
    node: mountNode
  });

  app.ports.log.subscribe(() => {
    console.log('test');
  });
})();