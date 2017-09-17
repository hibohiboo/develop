'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tests/lib', express.static(path.join(__dirname, 'jasmine/lib')));
app.use('/tests/src', express.static(path.join(__dirname, 'src')));


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);