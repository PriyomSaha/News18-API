const express = require('express');
const app = express();


const puppeteer = require('puppeteer');

app.get('/api/headlines', function(req, res) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage({ headless: false });
    await page.goto('https://www.news18.com/india/1', { waitUntil: 'networkidle0' });
  
    await page.waitForSelector('.blog-list-blog')
  
    const blogs = await page.$$('.blog-list-blog')
  
    var data = [];
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
    res.send(data);
  })();
});





const port = process.env.PORT || 9000
app.listen(port,() =>console.log(`Server running on Port ${port}`));


















/*const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage({ headless: false });
  await page.goto('https://www.news18.com/india/1', { waitUntil: 'networkidle0' });

  await page.waitForSelector('.blog-list-blog')

  const blogs = await page.$$('.blog-list-blog')

  var data = [{ }];
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
 */