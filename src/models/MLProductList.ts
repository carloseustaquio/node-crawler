import Page from "../appTypes/Page";
import ProductList from "../appTypes/ProductList";

export default class MLProductList implements ProductList {
  constructor(public limit: number) { }

  async crawlerRun($: CheerioSelector, url: string) {
    console.log("Crawling products list page...")
    const searchResults = $(
      "#searchResults .item__info-link, .item__info-title"
    );

    this.checkResults(searchResults.length, url)

    const arrLinks = searchResults
      .toArray()
      .splice(0, this.limit)
      .map((element, index) => element.attribs.href)

    return arrLinks;
  }

  checkResults(length: number, url: string) {
    if (!length) {
      const sanitizedUrl = url.replace(/^https:\/\//, "").split("/")[0]
      throw new Error(`The website <b>${sanitizedUrl}</b> didn't respond, please try again.`);
    }
  }
}
