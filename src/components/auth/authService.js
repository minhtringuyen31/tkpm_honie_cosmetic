const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const authSchemas = require('./authSchema');
const authRep = require('./authRepository');
const bcrypt = require('bcryptjs');
const db = require('../connect_DB');

const ajv = new Ajv();
addFormats(ajv);

exports.checkLogIFormat = (reqBody) => {
    if (!ajv.validate(authSchemas.logInSchema, reqBody)) {
        return false;
    }
    return true;
};

exports.checkSignUpFormat = (reqBody) => {
    if (!ajv.validate(authSchemas.signUpSchema, reqBody)) {
        return false;
    }
    return true;
};

exports.isExistedAccount = async (email) => {
    console.log("check existed");
    const exist = await authRep.isExistedEmail(email);
    console.log("Exist: " + exist);
    if (exist) {
        return true;
    } else {
        return false;
    }
};

exports.register = async (reqBody) => {
    const salt = await bcrypt.genSalt(10);
    console.log(reqBody);
    const hashPassword = await bcrypt.hash(reqBody.userPassword, salt);
    const newUser = {
        userName: reqBody.userName,
        userEmail: reqBody.userEmail,
        userPassword: hashPassword,
        userPhoneNumber: '',
        userBirthday: '',
        userAddress: ''
    }
    // call query insert new user into database
    const result = await authRep.addNewUser(newUser);
    console.log("register: " + result);
    if (result) {
        console.log("Add new user successfully");
        return true;

    }
    else {
        console.log("Add new user failure");
        return false;
    }

};


exports.signIn = async (inputEmail, inputPassword) => {
    const user = await authRep.getUserAccountByEmail(inputEmail);
    console.log(user);
    if (!user || user.length == 0) {
        return null;
    }
    else if (await bcrypt.compare(inputPassword, user[0].USER_PASSWORD)) {
        return user;
    }
    else {
        return null;
    }
};

