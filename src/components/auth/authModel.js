const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    userPassword: {
        type: String,
        require: true,
    },
    userPhoneNumber: {
        type: String,
        require: true,
    },
    userAddress: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Profile', authSchema);