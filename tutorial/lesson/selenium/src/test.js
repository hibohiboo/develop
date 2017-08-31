'use strict';
console.log('test');
var webdriverio = require('webdriverio');

var client = webdriverio
.remote({ desiredCapabilities: { browserName: 'chrome' } })
.init()
.url('https://www.google.com/');

console.log(client);

client
.getTitle()
.then(function (title) {
  console.log(title);
})
.getHTML('body')
.then(function (data) {
  console.log(data);
})
.end();