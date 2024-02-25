const { Router } = require("express");
const router = Router();
const { initialize } = require("../controllers/initializeDB");
const { getTransactions } = require("../controllers/transactions");
const { getStatistics } = require("../controllers/statistics");
const { getBarChart, getPieChart } = require("../controllers/chart");
const { getCombinedData } = require("../controllers/combinedData");

router.get("/", (req, res) => {
  return res.json({ success: true, message: "Server is up and running! 🚀" });
});

router.get("/initialize-db", initialize);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/chart/bar", getBarChart);
router.get("/chart/pie", getPieChart);
router.get("/combined-data", getCombinedData);

module.exports = router;
