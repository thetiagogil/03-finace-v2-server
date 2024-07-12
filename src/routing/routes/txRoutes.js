const TxController = require("../controllers/txController");
const express = require("express");
const router = express.Router();

router.post("/", TxController.createTx);
router.get("/", TxController.getTxByStatus)

module.exports = router;
