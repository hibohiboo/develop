

module.exports = {
  タイトルページ接続テスト(browser) {
    // const {Builder, By, Key, until} = require('selenium-webdriver');

    browser
      .windowMaximize()
      .url(browser.globals.applicationUrl)
      .assert.containsText('body', 'Tragedy Rooper Scenario Maker')
      .saveScreenshot('screenshots/test.png')
      .end();
  },
};
