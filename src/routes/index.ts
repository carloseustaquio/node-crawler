import express from "express"

// Controllers
import * as CrawlerController from "../Controllers/CrawlerController"

const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.send("Crawler Mercado Livre");
});

// POST
router.post("/crawler", CrawlerController.index);

export default router;
