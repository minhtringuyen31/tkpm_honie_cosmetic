const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const accountController = require('./accountController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatar')
    },
    filename: (req, file, cb) => {
        console.log("file: " + file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.get('/myProfile', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('customer/account/editProfile');
});

router.post('/editProfile', accountController.editProfile);

router.post('/changePass', accountController.editPassword);

router.post('/resetpass',accountController.sendMail);
router.get('/resetpass', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('customer/auth/forgotpassword', { layout: false });
});
router.get('/changepass', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('customer/account/changepass', { layout: false });
});

module.exports = router;