const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { authenticate } = require('./passport');
const passport = require('./passport');



module.exports = router;