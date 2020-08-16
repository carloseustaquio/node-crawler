import axios from "axios";
import cheerio from "cheerio";
import Page from "../appTypes/Page";

export default class Crawler {
  constructor(private url: string) { }

  async execute(model: Page) {
    const html = await this.fetchData();
    const $ = cheerio.load(html);

    return model.crawlerRun($, this.url);
  }

  async fetchData(search?: string) {
    const searchUrl = encodeURI(this.url);
    const response = await axios(searchUrl);

    if (!response.data) {
      console.log("Invalid data object");
      throw new Error("Error while fetching html");
    }

    return response.data;
  }
}
