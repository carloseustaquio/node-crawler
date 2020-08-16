import { Router } from "express"

// Controllers
import * as CrawlerController from "../Controllers/CrawlerController"

const router = Router();

// GET
router.get("/", (req, res) => {
  res.send("Crawler Mercado Livre");
});

// POST
router.post("/crawler", CrawlerController.index);

export default router;
