const connection = require('../connect_DB');

exports.editProfile = async (nameEdit, emailEdit, addressEdit, phoneEdit, birthdayEdit) => {
    console.log("service update");
    try {
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE USERS SET USERS.USER_NAME = ?, USERS.USER_ADDRESS = ?, USERS.USER_PHONE = ?, USERS.USER_BIRTHDAY = ? WHERE USERS.USER_EMAIL = ?', [nameEdit, addressEdit, phoneEdit, birthdayEdit, emailEdit]);
        console.log("success");
        const [user, fields] = await poolPromise.query(
            "SELECT * from USERS WHERE USERS.USER_EMAIL = ? LIMIT 1", [emailEdit]);
        console.log('111111');
        console.log(user);
        return user;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.changePassword= async(passChange,emailChange)=>{
    console.log("change pass");
    try{
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE USERS SET USERS.USER_PASSWORD = ? WHERE USERS.USER_EMAIL = ?', [passChange,emailChange]);
        console.log("success");
        const [user, fields] = await poolPromise.query(
            "SELECT * from USERS WHERE USERS.USER_EMAIL = ? LIMIT 1", [emailChange]);
        console.log('111111');
        console.log(user);
        return user;


    }
    catch(err){
        console.log(err);
        return false;
    }
}