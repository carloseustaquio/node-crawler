import express from "express"

// Controllers
const CrawlerController = require("../Controllers/CrawlerController");

const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.send("Crawler Mercado Livre");
});

// POST
router.post("/crawler", CrawlerController.index);

export default router;
