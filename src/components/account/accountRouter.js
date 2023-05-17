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

router.get('/editProfile', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('account/editProfile', { layout: false });
});

router.post('/editProfile', accountController.editProfile);

router.get('/changePass', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('account/changePass', { layout: false });
});

router.post('/changePass', accountController.editPassword);

module.exports = router;