import { Request, Response } from "express"
// models
import Crawler from "../models/Crawler"
import MLProduct from "../models/MLProduct"
import MLProductList from "../models/MLProductList"

// constants
const DEFAULT_LIMIT = 5;
const URL = `https://lista.mercadolivre.com.br`;

export const index = async (req: Request, res: Response) => {
  try {
    const { search, limit = DEFAULT_LIMIT } = req.body;
    const productListUrl = `${URL}/${search}`;

    // check required body params
    if (!search) throw new Error(`Missing param <b>search</b> in body.`)

    // crawl list of products page
    const crawler = new Crawler(productListUrl);
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
    console.error(error)
    res.status(404).send(error.message);
  }
}
