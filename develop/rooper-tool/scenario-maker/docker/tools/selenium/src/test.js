'use strict';

module.exports = {
  'Display sample -> search -> assert': function (browser) {
    const {Builder, By, Key, until} = require('selenium-webdriver');

    browser
      .windowMaximize()
      .url(browser.globals.applicationUrl)
      .assert.containsText('body','Tragedy Rooper Scenario Maker')
      .saveScreenshot('screenshots/test.png')
      .end();
  }
};
