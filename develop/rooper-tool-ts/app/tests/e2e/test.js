

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
  ルーティングテスト_(browser) {
    browser
      .windowMaximize()
      .url(`${browser.globals.applicationUrl}/#!/`)
      .assert.containsText('h2', 'トップ')
      .end();
  },
  ルーティングテスト_home(browser) {
    browser
      .windowMaximize()
      .url(`${browser.globals.applicationUrl}/#!/home`)
      .assert.containsText('h2', 'トップ')
      .end();
  },
  ルーティングテスト_about(browser) {
    browser
      .windowMaximize()
      .url(`${browser.globals.applicationUrl}/#!/about`)
      .assert.containsText('h2', 'このページについて')
      .saveScreenshot('screenshots/test.png')
      .end();
  },
};
