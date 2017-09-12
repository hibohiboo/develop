'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);