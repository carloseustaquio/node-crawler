import ProductPage from "../appTypes/ProductPage"

export default class MLProduct implements ProductPage {
  public link: string = ""
  public name: string = ""
  public price: number = 0
  public store: string | null = ""
  public state: string | null = ""
  constructor() { }

  crawlerRun($: CheerioSelector, url: string) {
    console.info("Crawling product page...")
    this.link = url;
    this.name = this.selectName($);
    this.price = this.selectPrice($);
    this.store = this.selectStore($);
    this.state = this.selectState($);

    return this;
  }

  selectName($: CheerioSelector) {
    return $(".ui-pdp-title, .item-title h1.item-title__primary")
      .text()
      .replace(/\n|\t/g, "");
  }

  selectPrice($: CheerioSelector) {
    const productPrice =
      $("[itemprop=price]").text() ||
      $("[itemprop=offers]").text() ||
      $("#productInfo .item-price .price-tag")
        .not(".price-tag__del, .discount-arrow")
        .find(
          ".price-tag-fraction, .price-tag-decimal-separator, .price-tag-cents"
        )
        .text();

    const sanitizedPriceArr = productPrice.match(/\d|[,]/g) // possibly null
    const sanitizedPrice = sanitizedPriceArr && // only executes if sanitizedPriceArr !== null
      parseFloat(sanitizedPriceArr.join("").replace(",", "."))

    return sanitizedPrice || 0
  }

  selectStore($: CheerioSelector) {
    const store =
      $(".ui-pdp-seller__header__title .ui-pdp-seller__link-trigger").text() ||
      $(".official-store-info .title").text().trim() ||
      null;

    return store;
  }

  selectState($: CheerioSelector) {
    const productState =
      $(".ui-pdp-header__subtitle .ui-pdp-subtitle")
        .text()
        .split("|")[0]
        .trim() ||
      $(".vip-title-info .item-conditions").text().split("-")[0].trim();

    if (["novo", "usado"].includes(productState.toLowerCase())) {
      return productState;
    } else return null;
  }
}
