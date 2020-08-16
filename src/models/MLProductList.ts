import Page from "../appTypes/Page";
import ProductList from "../appTypes/ProductList";

export default class MLProductList implements ProductList {
  constructor(public limit: number) { }

  async crawlerRun($: CheerioSelector, url: string) {
    const searchResults = $(
      "#searchResults .item__info-link, .item__info-title"
    );

    this.checkResults(searchResults.length, url)

    const arrLinks: Array<string | undefined> = [];

    searchResults.each((index, element) => {
      if (index < this.limit) {
        arrLinks[index] = $(element).attr("href");
      }
    });

    return arrLinks;
  }

  checkResults(length: number, url: string) {
    if (!length) {
      const sanitizedUrl = url.replace(/^https:\/\//, "").split("/")[0]
      throw new Error(`
        The website <b>${sanitizedUrl}</b> didn't responded, please try again.
      `);
    }
  }
}
