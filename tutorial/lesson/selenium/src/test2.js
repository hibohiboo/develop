const Papa = require('papaparse');
const { promisify } = require('util');
const fs = require('fs');
// http://qiita.com/teratsyk/items/bf63b308086cc1c0f828
const {Builder, By, Key, until} = require('selenium-webdriver');
const t = require('selenium-webdriver/testing');

// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html

// google検索を行うサンプル
const googleSearch = async (driver, searchQuery)=>{
  // googleにアクセス
  await driver.get('https://www.google.com');

  // 検索ボックスにwebdriverと入力してEnter(改行）
  const query = driver.wait(until.elementLocated(By.name('q')));
  query.sendKeys(searchQuery + '\n');

  // 検索結果が出るまで待つ
  await driver.wait(until.titleContains(searchQuery), 1000);

  // 検索結果の件数を取得
  await driver.findElement(By.css('#resultStats'));
  const statsElm = await driver.findElement(By.css('#resultStats'));
  const result = await statsElm.getText();
  const resultList = [];
  resultList.push(result);

  for(let i=0, len = 3; i<len; i++){
    // n件目を取得
    const num = i + 1; // nth-childは最初の要素が１
    const elm = await driver.findElement(By.css('#rso > div > div > div:nth-child(' + num + ') h3'));
    const r = await elm.getText();
    resultList.push(r);
  }

  // 配列で返却
  return resultList;
};

const parseTest = async ()=> {
  // csv読み込み
  const out = await promisify(fs.readFile)('data/data.csv', 'utf-8');
  // csvパース
  const inputList = Papa.parse(out).data;
  console.log(inputList)
  const resultList = [];
  // ドライバ作成
  const driver = new Builder()
  .forBrowser('chrome')
  .usingServer('http://hub:4444/wd/hub')
  .build();
  try{
    for(let i= 0, len = inputList.length; i < len; i++){
      // csvの１列目の項目でgoogle検索
      const array = inputList[i];
      const q = array[0];
      const r = await googleSearch(driver, q);
      resultList.push(r);
    }
  }catch(e){
    console.log(e);
  }finally{
    driver.quit();
  }
  // 結果リストをcsvに変換
  const config = {
    quotes: true,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",",
    //header: true,
    newline: "\r\n"
  };
  const csv = Papa.unparse(resultList, config);
  //console.log(csv);
  // 書き出し
  fs.writeFileSync('./result/result.csv', csv);
}
parseTest();