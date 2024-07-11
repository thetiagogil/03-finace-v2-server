const UserController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/:userId", UserController.getUserById);
router.put("/:userId", UserController.updateUserWalletById);

module.exports = router;
