const express = require("express");
const router = express.Router();
const accountController = require('../../controllers/accountController')

router
  .route('/')
  .get(accountController.getAccountData)

module.exports = router