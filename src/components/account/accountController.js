const accountService = require('./accountService');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

exports.editProfile = async (req, res) => {
    console.log("controller");
    console.log(req.body.emailEdit);
    const user = await accountService.editProfile(req.body.nameEdit, req.body.emailEdit, req.body.addressEdit, req.body.phoneEdit, req.body.birthdayEdit);
    console.log("acc: ");
    console.log(user[0]);


    if (user) {
        res.render('account/editProfile');
        res.locals.user.loginName = user[0].USER_NAME;
        res.locals.user.loginAddress = user[0].USER_ADDRESS;
        res.locals.user.loginPhone = user[0].USER_PHONE;
        res.locals.user.loginBirthday = user[0].USER_BIRTHDAY;
        return user[0];
    }
    else {
        res.render('/index');
        return null;
    }
}

