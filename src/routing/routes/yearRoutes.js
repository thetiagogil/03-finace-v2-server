const express = require("express");
const router = express.Router();
const YearController = require("../controllers/yearController");

router.get("/:userId/:status", YearController.getAllYearsByStatus);
router.get("/:userId/:status/:year", YearController.getYearByStatus);
router.get("/:userId/:status/:year/month-summary", YearController.getYearCategorySummaryByStatus);
router.get("/:userId/:status/:year/top-months", YearController.getYearTopMonthsByStatus);
router.get("/:userId/:status/:year/top-categories", YearController.getYearTopCategoriesByStatus);
router.get("/:userId/:status/:year/month-totals", YearController.getYearMonthTotalsByStatus);

module.exports = router;
