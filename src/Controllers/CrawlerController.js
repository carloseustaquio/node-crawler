const Crawler = require("../models/Crawler");
const MLProduct = require("../models/MLProduct");
const MLProductList = require("../models/MLProductList");
const checkRequiredParams = require("../helpers/checkRequiredParams");

const DEFAULT_LIMIT = 5;
const DEFAULT_URL = `https://lista.mercadolivre.com.br`;

module.exports = {
  async index(req, res, next) {
    try {
      const { search, limit = DEFAULT_LIMIT } = req.body;
      const listUrl = `${DEFAULT_URL}/${search}`;

      // check body params
      checkRequiredParams([search]);

      // crawl list of products page
      const crawler = new Crawler(listUrl);
      const productLinksArr = await crawler.execute(new MLProductList(limit));

      // crawl each product's page and retrieve it's data
      const crawledProducsArr = await Promise.all(
        productLinksArr.map(async (link, index) => {
          const productCrawler = new Crawler(link);
          return await productCrawler.execute(new MLProduct());
        })
      );

      res.send(crawledProducsArr);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
