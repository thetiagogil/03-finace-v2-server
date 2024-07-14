const express = require("express");
const router = express.Router();
const TxController = require("../controllers/txController");
const txFunction = require("../controllers/txFunctions");

router.post("/", TxController.createTx);
router.get("/years/:userId/:status", txFunction.getUserTxYearsByStatus);
router.get("/years/:userId/:status/:year/month-summary", txFunction.getTxMonthCategorySummary);
router.get("/years/:userId/:status/:year/top-categories", txFunction.getYearTopCategories);
router.get("/years/:userId/:status/:year/top-months", txFunction.getYearTopMonths);
router.get("/years/:userId/:status/:year/month-totals", txFunction.getYearMonthTotals);
router.get("/:userId/:status", txFunction.getTxByStatus);
router.put("/:txId", TxController.updateTxById);
router.delete("/:txId", TxController.deleteTxById);

module.exports = router;
