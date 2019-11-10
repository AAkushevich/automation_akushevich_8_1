const googleSearchPage = require('./GoogleSearchPage.js');
const googleResultPage = require('./GoogleResPage.js');
const defaultValues = require('./testData');
require('geckodriver');
require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
let numSearchRes, searchTime, numOfSearchResToCmpare = 0;

if (process.argv.length > 3) {
  if(process.argv[3] != "undefined") {
    defaultValues.browser = process.argv[3];
  }
  if(process.argv[4] != "undefined") {
    numOfSearchResToCmpare = process.argv[4];
  }
}

let driver = new Builder().forBrowser(defaultValues.browser).build();

beforeAll(async function () {
  await googleSearchPage.initDriver(driver);
  await googleSearchPage.openPage(defaultValues.googleLink);
  await googleSearchPage.startSearch(defaultValues.searchString);
  await googleSearchPage.waitUntilPageLoaded();
  driver = await googleSearchPage.getDriver();
}, 20000);


describe('Search test', function () {

  it('First page, find in body',async function (done) {
     googleResultPage.initDriver(driver).then(async () => {
      let bodies = await googleResultPage.getResultsBodies();

        for(let body of bodies) {
          body.getText().then((bodyText) => {
            expect(bodyText.toString().toLowerCase().includes(defaultValues.searchString)).toBe(true);  
          });
        }
        done();
     });
  }, 20000);

  it('First page, find in header', function (done) {
    googleResultPage.getResultsHeaders().then((headers) => {
      for(let header of headers) {
        header.getText().then((headerText) => {
          expect(headerText.toString().toLowerCase().includes(defaultValues.searchString)).toBe(true);  
        });
      }
      done();
    });
  }, 10000);

  it('First page, find in url', function (done) {
    googleResultPage.getResultsUrls().then((urls) => {
      for(let url of urls) {
        url.getText().then((urlText) => {
          expect(urlText.toString().toLowerCase().includes(defaultValues.searchString)).toBe(true);  
        });
      }
      done();
    });
  }, 10000);

    it('Second page, find in body', async function (done) {

          await googleResultPage.nextPage();
          googleResultPage.getResultsBodies().then((bodies) => {
            for(let body of bodies) {
              body.getText().then((bodyText) => {
                expect(bodyText.toString().toLowerCase().includes(defaultValues.searchString)).toBe(true);  
              });
            }
            done();    
          });
      }, 10000);
    

    it('Second page, find in header', function (done) {
      googleResultPage.getResultsHeaders().then((headers) => {
        for(let header of headers) {
          header.getText().then((headerText) => {
            expect(headerText.toString().toLowerCase().includes(defaultValues.searchString)).toBe(true);  
          });
        }
        done();
      });
    }, 10000);

    it('Second page, find in url', function (done) {
      googleResultPage.getResultsUrls().then((urls) => {
        for(let url of urls) {
          url.getText().then((urlText) => {
            expect(urlText.toString().toLowerCase().includes(defaultValues.searchString)).toBe(true);  
          });
        }
        done();
      });
    }, 10000);

    it("Is num of results is grearer than N", async function() {
      numSearchRes = await googleResultPage.getNumOfResults();
      searchTime = await googleResultPage.getTimeOfSearching();
      expect(+numSearchRes.replace(/\D+/g, "")).toBeGreaterThan(+numOfSearchResToCmpare);
    }, 10000);
  
  

});

afterAll(async function() {
  console.log();
  console.log(`Results: ${numSearchRes}`);
  console.log(`Search time: ${searchTime}`);
  await driver.quit();
}, 15000);

