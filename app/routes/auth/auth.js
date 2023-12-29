const express = require("express");
const router = express.Router();
const authController = require('../../controllers/authController')

router
  .route('/')
  .get(authController.authTrigger)


router
  .route('/callback')
  .get(authController.redirectFn)

module.exports = router

