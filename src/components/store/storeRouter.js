const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.get('/introStore', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('customer/store/introStore');
});

module.exports = router;
