// http://qiita.com/teratsyk/items/bf63b308086cc1c0f828

const {Builder, By, Key, until} = require('selenium-webdriver');
const t = require('selenium-webdriver/testing');
let driver = new Builder()
.forBrowser('chrome')
.usingServer('http://hub:4444/wd/hub')
    .build();
// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
driver.get('https://www.google.com').then(function () {
  var query = driver.wait(until.elementLocated(By.name('q')));
  query.sendKeys('webdriver\n');
  driver.wait(until.titleContains('webdriver'), 1000).then((result)=>{
      driver.findElement(By.css('#resultStats')).then(elm=>{
        elm.getText().then(s=>console.log(s));
      });
  });
  driver.quit();
});