'use strict';

// index.htmlがdistにコピーされるようにRequireする
require('./index.html');

var Elm = require('./Main.elm');
var mountNode = document.getElementById('main');

// .embed()はオプションの第二引数を取り、プログラム開始に必要なデータを与えられる。たとえばuserIDや何らかのトークンなど
var app = Elm.Main.embed(mountNode);