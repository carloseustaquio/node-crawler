import { Request, Response } from "express"
// models
import Crawler from "../models/Crawler"
import MLProduct from "../models/MLProduct"
import MLProductList from "../models/MLProductList"
import { PerformanceStats } from "../functions/performance";

// constants
const DEFAULT_LIMIT = 5;
const URL = `https://lista.mercadolivre.com.br`;

export const index = async (req: Request, res: Response) => {
  try {
    const { search, limit = DEFAULT_LIMIT } = req.body;
    const productListUrl = `${URL}/${search}`;

    // check required body params
    if (!search) throw new Error(`Missing param <b>search</b> in body.`)

    // start performance statistic
    const performanceStats = new PerformanceStats()
    performanceStats.start()

    // crawl product list page
    const crawler = new Crawler(productListUrl);
    const productLinksArr = await crawler.execute(new MLProductList(limit));

    // crawl each product's page and retrieve it's data
    const crawledProducsArr = await Promise.all(
      productLinksArr.map(async (link: string, index: number) => {
        const productCrawler = new Crawler(link);
        return await productCrawler.execute(new MLProduct());
      })
    );

    // end
    performanceStats.stop()
    res.send(crawledProducsArr);
  } catch (error) {
    console.error(error)
    res.status(404).send(`<p>Error: ${error.message}</p>`);
  }
}
