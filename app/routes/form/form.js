const express = require("express");
const router = express.Router();
const accountController = require('../../controllers/formController')

router
  .route('/')
  .post(accountController.processFormData)

module.exports = router