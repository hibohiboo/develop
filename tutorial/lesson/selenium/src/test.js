// http://qiita.com/teratsyk/items/bf63b308086cc1c0f828

const {Builder, By, Key, until} = require('selenium-webdriver');
const t = require('selenium-webdriver/testing');
let driver = new Builder()
  .forBrowser('chrome')
  .usingServer('http://hub:4444/wd/hub')
  .build();
// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html

// google検索を行うサンプル
const googleSearch = async ()=>{
  await driver.get('https://www.google.com');
  const query = driver.wait(until.elementLocated(By.name('q')));
  query.sendKeys('webdriver\n');
  await driver.wait(until.titleContains('webdriver'), 1000);
  await driver.findElement(By.css('#resultStats'));
  const elm = await driver.findElement(By.css('#resultStats'));
  await elm.getText().then(s=>console.log(s));
  driver.quit();
};
googleSearch();