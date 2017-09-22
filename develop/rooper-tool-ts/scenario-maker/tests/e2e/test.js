

module.exports = {
  タイトルページ接続テスト(browser) {
    // const {Builder, By, Key, until} = require('selenium-webdriver');

    browser
      .windowMaximize()
      .url(browser.globals.applicationUrl)
      .assert.containsText('h1', '惨劇RoopeRオンラインツール')
      .saveScreenshot('screenshots/test.png')
      .end();
  },
};
