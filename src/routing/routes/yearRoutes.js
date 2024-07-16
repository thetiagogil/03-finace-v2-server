const express = require("express");
const router = express.Router();
const getYearCategorySummary = require("../controllers/yearController/getYearCategorySummary");
const getYearCategoriesByMonths = require("../controllers/yearController/getYearCategoriesByMonths");
const getYearMonthsTotals = require("../controllers/yearController/getYearMonthsTotals");
const getYearTopMonths = require("../controllers/yearController/getYearTopMonths");
const getYearTopCategories = require("../controllers/yearController/getYearTopCategories");
const getYear = require("../controllers/yearController/getYear");
const getAllYears = require("../controllers/yearController/getAllYears");

router.get("/category-summary/:userId/:type/:year/:month?", getYearCategorySummary); // dashboard page table
router.get("/category-by-month/:userId/:status/:year", getYearCategoriesByMonths); // years page category by month table
router.get("/months-totals/:userId/:status/:year", getYearMonthsTotals); // years months totals graph
router.get("/top-months/:userId/:status/:year", getYearTopMonths); // years top 5 months in a year chart
router.get("/top-categories/:userId/:status/:year", getYearTopCategories); // dashboard page top 5 categories in a year chart

router.get("/:userId/:status/:year", getYear); // years page single year
router.get("/:userId/:status", getAllYears); // overview page all years

module.exports = router;
