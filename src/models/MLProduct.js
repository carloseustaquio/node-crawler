class MLProduct {
  constructor() {}

  crawlerRun($, url) {
    this.link = url;
    this.name = this.selectName($);
    this.price = this.selectPrice($);
    this.store = this.selectStore($);
    this.state = this.selectState($);

    return this;
  }

  selectName($) {
    return $(".ui-pdp-title, .item-title h1.item-title__primary")
      .text()
      .replace(/\n|\t/g, "");
  }

  selectPrice($) {
    const productPrice =
      $("[itemprop=price]").text() ||
      $("[itemprop=offers]").text() ||
      $("#productInfo .item-price .price-tag")
        .not(".price-tag__del, .discount-arrow")
        .find(
          ".price-tag-fraction, .price-tag-decimal-separator, .price-tag-cents"
        )
        .text();

    const sanitizedPrice = productPrice
      .match(/\d|[,]/g)
      .join("")
      .replace(",", ".");

    console.log(sanitizedPrice);

    return parseFloat(sanitizedPrice);
  }

  selectStore($) {
    const store =
      $(".ui-pdp-seller__header__title .ui-pdp-seller__link-trigger").text() ||
      $(".official-store-info .title").text().trim() ||
      null;

    return store;
  }

  selectState($) {
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

module.exports = MLProduct;
