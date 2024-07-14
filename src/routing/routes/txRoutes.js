const express = require("express");
const router = express.Router();
const TxController = require("../controllers/txController");

router.post("/", TxController.createTx);
router.get("/:userId/:status", TxController.getTxByStatus);
router.put("/:txId", TxController.updateTxById);
router.delete("/:txId", TxController.deleteTxById);

module.exports = router;
