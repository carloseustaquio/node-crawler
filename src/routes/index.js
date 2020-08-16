const express = require("express");

// Controllers
const CrawlerController = require("../Controllers/CrawlerController");

const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.send("Crawler Mercado Livre");
});

// POST
router.post("/crawler", CrawlerController.index);

module.exports = router;
