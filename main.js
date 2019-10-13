const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function main() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.onliner.by/');

    let elementById = await driver.findElements(By.id("userbar")); 
    countElements("By.id", elementById);
    
    let elementByName = (await driver.findElements(By.name("query")));
    countElements("By.name", elementByName);

    let elementByClass = await driver.findElements(By.className("project-navigation project-navigation_overflow project-navigation_scroll"));
    countElements("By.className", elementByClass);

    let elementByTag = await driver.findElements(By.tagName("body > div > footer"));
    countElements("By.tagName", elementByTag);

    let elementByLinkText = await driver.findElements(By.linkText("Читатель Onliner проверил мастера по ремонту ноутбуков. Тот проверку не прошел"));
    countElements("By.linkText", elementByLinkText);

    let elementByPartialLinkText = await driver.findElements(By.partialLinkText("Видеокарты"));
    countElements("By.partialLinkText", elementByPartialLinkText);

    let elementByCssSelector = await driver.findElements(By.css("div.g-container-outer"));
    countElements("By.css", elementByCssSelector);
  } finally {
    await driver.quit();
  }
})();

function countElements(type, elements) {
    console.log(type);
    console.log("Element count: " + elements.length);
    console.log("*******************************************************************************************");

}
