import { Request, Response } from "express"
// models
import Crawler from "../models/Crawler"
import MLProduct from "../models/MLProduct"
import MLProductList from "../models/MLProductList"
// helper function
import checkRequiredParams from "../helpers/checkRequiredParams"

// constants
const DEFAULT_LIMIT = 5;
const DEFAULT_URL = `https://lista.mercadolivre.com.br`;

export const index = async (req: Request, res: Response) => {
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
      productLinksArr.map(async (link: string, index: number) => {
        const productCrawler = new Crawler(link);
        return await productCrawler.execute(new MLProduct());
      })
    );

    res.send(crawledProducsArr);
  } catch (error) {
    res.status(404).send(error.message);
  }
}
