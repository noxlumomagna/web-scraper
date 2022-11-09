const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const PORT = 2121;

const app = express();

const url = "https://www.theguardian.com/us";

axios(url)
  .then((response) => {
    const html = response.data;
    const scrape = cheerio.load(html);
    let articles = [];

    scrape(".fc-item__title", html).each(function () {
      const title = scrape(this).text();
      const url = scrape(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
