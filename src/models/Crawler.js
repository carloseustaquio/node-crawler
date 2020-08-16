const axios = require("axios");
const cheerio = require("cheerio");

class Crawler {
  constructor(url) {
    this.url = url;
  }

  async execute(model) {
    const html = await this.fetchData();
    const $ = cheerio.load(html);

    return model.crawlerRun($, this.url);
  }

  async fetchData(search) {
    const searchUrl = encodeURI(this.url);
    const response = await axios(searchUrl);

    if (!response.data) {
      console.log("Invalid data object");
      throw new Error("Error while fetching html");
    }

    return response.data;
  }
}

module.exports = Crawler;
