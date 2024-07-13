const express = require("express");
const router = express.Router();
const TxController = require("../controllers/txController");

router.post("/", TxController.createTx);
router.get("/years/:userId/:status", TxController.getUserTxYearsByStatus);
router.get("/:userId/:status", TxController.getTxByStatus);
router.get("/:txId", TxController.updateTxById);
router.delete("/:txId", TxController.deleteTxById);

module.exports = router;
