import ProductList from "../appTypes/ProductList";

export default class MLProductList implements ProductList {
  constructor(public limit: number) { }

  async crawlerRun($: CheerioStatic, url: string) {
    console.log("Crawling products list page...")
    const searchResults = $("#searchResults, section.ui-search-results")
    const linksOfItems = searchResults.find(".item__info-title, .item_info-title, .item-link, .ui-search-link")

    const arrLinks = linksOfItems
      .toArray()
      .splice(0, this.limit)
      .map((element, index) => element.attribs.href)

    if (!arrLinks.length) {
      throw new Error(
        `No items returned in search. 
        Please, try again later or with other search value.`
      )
    }

    return arrLinks;
  }
}
