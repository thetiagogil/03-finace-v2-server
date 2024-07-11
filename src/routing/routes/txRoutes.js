const TxController = require("../controllers/txController");
const express = require("express");
const router = express.Router();

router.post("/", TxController.createTx);

module.exports = router;
