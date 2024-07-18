const express = require("express");
const router = express.Router();
const getYearCategorySummary = require("../controllers/yearController/getYearCategorySummary");
const getYearCategoriesByMonths = require("../controllers/yearController/getYearCategoriesByMonths");
const getYearMonthsTotals = require("../controllers/yearController/getYearMonthsTotals");
const getYearTopCategories = require("../controllers/yearController/getYearTopCategories");
const getYearTopMonths = require("../controllers/yearController/getYearTopMonths");
const getMonths = require("../controllers/yearController/getMonths");
const getYearInfo = require("../controllers/yearController/getYearInfo");
const getYearsInfo = require("../controllers/yearController/getYearsInfo");
const getYears = require("../controllers/yearController/getYears");

router.get("/category-summary/:userId/:year/:month?", getYearCategorySummary); // dashboard page table
router.get("/category-by-month/:userId/:status/:year", getYearCategoriesByMonths); // years page category by month table
router.get("/months-totals/:userId/:status/:year", getYearMonthsTotals); // years months totals graph
router.get("/top-categories/:userId/:year/:month?", getYearTopCategories); // dashboard page top 5 categories in a year chart
router.get("/top-months/:userId/:status/:year", getYearTopMonths); // years top 5 months in a year chart
router.get("/months/:userId/:year", getMonths); // dashboard months

router.get("/:userId/:status/:year", getYearInfo); // years page single year
router.get("/:userId/:status", getYearsInfo); // overview page all years
router.get("/:userId", getYears); // dashboard years

module.exports = router;
