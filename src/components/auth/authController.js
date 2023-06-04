const passport = require('passport');
const authService = require('./authService');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const authRep = require('./authRepository');

exports.signup = async (req, res, next) => {
    console.log(req.body);
    const { userName, userEmail, userPassword } = req.body;
    if (authService.checkSignUpFormat(req.body) === false) {
        res.render('customer/auth/sign', { layout: false });
        return;
    }
    const check = await authService.isExistedAccount(userEmail);
    if (check == true) {
        res.render('customer/auth/sign', { layout: false });
        console.log("User existed");
        return;
    } else {
        console.log("user not exist")
        authService.register(req.body);
        res.redirect('/auth/sign');
    }
}

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.redirect('/index');
        }
    });

};


exports.verifyEmail = async (req, res) => {
    const { email } = req.params;
    const result = await authService.isExistedAccount(email);
    res.json(!result);
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Email Forgot: " + email);
    if (!email) {
        res.redirect('/auth/forgotPassword');
        return;
    }
    const check = await authService.isExistedAccount(email);
    console.log("Check Email Existed: " + check);
    if (!check) {
        res.redirect('/auth/forgotPassword');
        return;
    } else {
        const hashedEmail = await bcrypt.hash(email, parseInt(process.env.BRCYPT_SALT_ROUND));
        console.log("Hashed Email: " + hashedEmail);
        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "honie.cosmetic@outlook.com",
                pass: "123456@#$%"
            }
        })

        const options = {
            from: "honie.cosmetic@outlook.com",
            to: email,
            subject: "Reset Password",
            text: `localhost:3000/auth/forgotPassword/${email}?token=${hashedEmail}`
        }
        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Sent: " + info.response);
            console.log(`localhost:3000/auth/forgotPassword/${email}?token=${hashedEmail}`);
        })
        res.redirect('customer/auth/forgotPassword?status=success');
    }
}


exports.showResetPasswordForm = (req, res) => {
    if (!req.params.email || !req.query.token) {
        res.redirect('/auth/forgotPassword');
    } else {
        console.log("email: req.params.email, token: req.query.token " + req.params.email + req.query.token);
        res.render('customer/auth/resetPassword', { email: req.params.email, token: req.query.token });
    }
}

exports.resetPassword = async (req, res) => {
    console.log("controller resest");
    const { email, token, password } = req.body;
    console.log(email, token, password);
    if (!email || !token || !password) {
        res.redirect('customer/auth/forgotPassword');
    } else {
        console.log("vo day");
        const checkEmail = await bcrypt.compare(email, token);
        console.log(checkEmail);
        if (checkEmail == true) {
            console.log("vo day roi");
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const check = await authRep.updatePassword(email, hashPassword);
            console.log("register: " + check);
            if (check) {
                res.redirect('customer/auth/sign');
            }
            else {
                res.redirect('customer/auth/forgotPassword');
            }
        } else {
            res.redirect('customer/auth/forgotPassword');
        }
    }
}
