require('geckodriver');
require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
let defaultBrowser = "firefox";
let numSearchRes, searchTime, numOfSearchResToCmpare = 0;

if (process.argv.length > 3) {
  if(process.argv[3] != "undefined") {
    defaultBrowser = process.argv[3];
  }
  if(process.argv[4] != "undefined") {
    numOfSearchResToCmpare = process.argv[3];
  }
}
let driver = new Builder().forBrowser(defaultBrowser).build();

beforeAll(function (done) {
  driver.get('https://google.com').then(() => {
      driver.findElement(By.name('q')).then(tag => {
          tag.sendKeys("iTechArt").then(() => {
              tag.sendKeys(Key.ENTER).then(() => {
                driver.wait(until.elementsLocated(By.xpath('//span[@class="st"]'))).then(() => {
                  done();
                });
              });
          });
      });
  });
}, 20000);

  async function getResultsBodies() {
    return await driver.findElements(By.xpath('//span[@class="st"]'));
  }
  async function getResultsHeaders() {
    return await driver.findElements(By.className('LC20lb'));
  }
  async function getResultsUrls() {
    return await driver.findElements(By.xpath('//cite'));
  }

describe('Search test', function () {

  it('First page, find in body', function (done) {
    getResultsBodies().then((bodies) => {
      for(let body of bodies) {
        body.getText().then((bodyText) => {
          expect(bodyText.toString().toLowerCase().includes("itechart")).toBe(true);  
        });
      }
      done();
    })
  }, 10000);

  it('First page, find in header', function (done) {
    getResultsHeaders().then((headers) => {
      for(let header of headers) {
        header.getText().then((headerText) => {
          expect(headerText.toString().toLowerCase().includes("itechart")).toBe(true);  
        });
      }
      done();
    })
  }, 10000);

  it('First page, find in url', function (done) {
    getResultsUrls().then((urls) => {
      for(let url of urls) {
        url.getText().then((urlText) => {
          expect(urlText.toLowerCase().includes("itechart")).toBe(true);  
        });
      }
      done();
    })
  }, 10000);

  it('Second page, find in body', function (done) {
    driver.wait(until.elementsLocated(By.xpath('//a[@aria-label="Page 2"]'))).then(() => {
        driver.findElement(By.xpath('//a[@aria-label="Page 2"]')).sendKeys(Key.ENTER).then(() => {
          driver.wait(async function(){
            let pageLoadState = await driver.executeScript("return document.readyState");
            if(pageLoadState === "complete") {
              return true;
            }
          }).then(() => {
            getResultsBodies().then((bodies) => {
              for(let body of bodies) {
                body.getText().then((bodyText) => {
                  expect(bodyText.toString().toLowerCase().includes("itechart")).toBe(true);  
                });
              }
              done();
            })    
            });  
          });
        });
    }, 10000);

    it('Second page, find in header', function (done) {
      getResultsHeaders().then((headers) => {
        for(let header of headers) {
          header.getText().then((headerText) => {
            expect(headerText.toString().toLowerCase().includes("itechart")).toBe(true);  
          });
        }
        done();
      })       
    }, 10000);

    it('Second page, find in url', function (done) {
      getResultsUrls().then((urls) => {
        for(let url of urls) {
          url.getText().then((urlText) => {
            expect(urlText.toLowerCase().includes("itechart")).toBe(true);  
          });
        }
        done();
      })
    }, 10000);

    it("Is num of results is grearer than N", async function() {
      let resultStats = await driver.findElement(By.xpath('//*[@id="resultStats"]'));
      let resultText = await resultStats.getText();
      numSearchRes = await resultText.slice(0, resultText.indexOf(','));
      searchTime = await resultText.slice(resultText.indexOf('(') + 1, resultText.indexOf(')'));
      expect(numSearchRes > numOfSearchResToCmpare);
    }, 10000);
  
  });


afterAll(async function() {
  console.log();
  console.log(`Results: ${numSearchRes}`);
  console.log(`Search time: ${searchTime}`);
  await driver.quit();
}, 15000);
