const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { authenticate } = require('./passport');
const passport = require('./passport');

router.get('/sign', function (req, res, next) {
  res.render('auth/sign', { layout: false });
});

router.get('/logout', authController.logout);

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/auth/sign'
}));

router.post('/signup', authController.signup);

router.post('/signup', authController.signup);

router.get('/verify-email/:email', authController.verifyEmail);

router.get('/profiles', function (req, res, next) {
  res.render('auth/profiles', { layout: false });
});



router.get('/forgotPassword', function (req, res) {
  res.render('auth/forgotPassword', { layout: false });
});

router.post('/forgotPassword', authController.forgotPassword);

router.get('/forgotPassword/:email', authController.showResetPasswordForm);

router.post('/resetPassword', authController.resetPassword);

module.exports = router;