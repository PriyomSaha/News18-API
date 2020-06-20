const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage({ headless: false });
  await page.goto('https://www.news18.com/india/1', { waitUntil: 'networkidle0' });

  await page.waitForSelector('.blog-list-blog')

  const blogs = await page.$$('.blog-list-blog')

  var data = [{
    Title: '',
    ImageLink: ''
  }];
  for (const blog of blogs) {
    for (var i = 0; i < 20; i++) {
      await page.keyboard.press('ArrowDown');
    }
    const text = await blog.$eval('p', p => p.innerText);
    const image = await blog.$eval('img', img => img.getAttribute('src'));
    data.push({
      Title: text,
      ImageLink: image
    })
  }

console.log(data);

  //await browser.close();
})();



/*var webdriver = require('selenium-webdriver');
var  By =  webdriver.By;
var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
const baseUrl = "https://www.news18.com/india/1";
driver.get(baseUrl);

console.log(driver.findElement(By.className("blog-list-blog")).getSize());
//driver.quit();*/
