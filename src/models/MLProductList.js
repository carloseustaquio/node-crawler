class MLProductList {
  constructor(limit) {
    this.limit = limit;
  }

  async crawlerRun($, url) {
    const searchResults = $(
      "#searchResults .item__info-link, .item__info-title"
    );

    if (!searchResults.length) {
      throw new Error(`${url} didn't responded, please try again.`);
    }

    const arrLinks = [];

    await searchResults.each((index, element) => {
      if (index < this.limit) {
        arrLinks[index] = $(element).attr("href");
      }
    });

    return arrLinks;
  }
}

module.exports = MLProductList;
