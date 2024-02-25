const { Router } = require("express");
const router = Router();
const { checkMonth } = require("../middlewares");
const { initialize } = require("../controllers/initializeDB");
const { getTransactions } = require("../controllers/transactions");
const { getStatistics } = require("../controllers/statistics");
const { getBarChart, getPieChart } = require("../controllers/chart");
const { getCombinedData } = require("../controllers/combinedData");
const { sendResponse } = require("../utils");

router.get("/", (req, res) => {
  return res.json({ success: true, message: "Server is up and running! 🚀" });
});

router.get("/initialize-db", initialize);

//middleware to check if month parameter is present
router.use(checkMonth);

router.get("/transactions", sendResponse(getTransactions));
router.get("/statistics", sendResponse(getStatistics));
router.get("/chart/bar", sendResponse(getBarChart));
router.get("/chart/pie", sendResponse(getPieChart));
router.get("/combined-data", sendResponse(getCombinedData));

module.exports = router;
