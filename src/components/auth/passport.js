const passport = require('passport');
const LocalStrategy = require('passport-local');
const authService = require('./authService');


passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(email, password, cb) {
    console.log(email);
    console.log(password);
    const user = await authService.signIn(email, password);
    console.log(user);
    if (user) {
        console.log("success");
        return cb(null, user[0]);
    }
    else {
        console.log("failure");
        return cb(null, false);
    }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { loginEmail: user.USER_EMAIL, loginName: user.USER_NAME, loginPhone: user.USER_PHONE, loginBirthday: user.USER_BIRTHDAY, loginAddress: user.USER_ADDRESS, loginRole: user.USER_ROLE });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport;