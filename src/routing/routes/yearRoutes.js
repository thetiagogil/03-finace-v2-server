const express = require("express");
const router = express.Router();
const YearController = require("../controllers/yearController");

router.get("/:userId/:status", YearController.getUserTxYearsByStatus);
router.get("/:userId/:status/:year/month-summary", YearController.getTxMonthCategorySummary);
router.get("/:userId/:status/:year/top-categories", YearController.getYearTopCategories);
router.get("/:userId/:status/:year/top-months", YearController.getYearTopMonths);
router.get("/:userId/:status/:year/month-totals", YearController.getYearMonthTotals);

module.exports = router;
