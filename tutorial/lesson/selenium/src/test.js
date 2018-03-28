// http://qiita.com/teratsyk/items/bf63b308086cc1c0f828
const {Builder, By, Key, until} = require('selenium-webdriver');
const t = require('selenium-webdriver/testing');

// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
// ドライバ作成
const driver = new Builder()
.forBrowser('chrome')
.usingServer('http://hub:4444/wd/hub')
.build();

// google検索を行うサンプル
const googleSearch = async ()=>{
  // googleにアクセス
  await driver.get('https://www.google.com');

  // 検索ボックスにwebdriverと入力してEnter(改行）
  const query = driver.wait(until.elementLocated(By.name('q')));
  query.sendKeys('webdriver\n');

  // 検索結果が出るまで待つ
  await driver.wait(until.titleContains('webdriver'), 1000);

  // 検索結果の件数を取得して表示
  await driver.findElement(By.css('#resultStats'));
  const elm = await driver.findElement(By.css('#resultStats'));
  await elm.getText().then(s=>console.log(s));

  // webdriverを終了する
  driver.quit();
};
googleSearch();