const accountService = require('./accountService');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const authService = require('../auth/authRepository');
const async = require('hbs/lib/async');
const nodemailer = require('nodemailer');


exports.editProfile = async (req, res) => {
    console.log("controller");
    console.log(req.body.emailEdit);
    const user = await accountService.editProfile(req.body.nameEdit, req.body.emailEdit, req.body.addressEdit, req.body.phoneEdit, req.body.birthdayEdit);
    console.log("acc: ");
    console.log(user[0]);


    if (user) {
        res.render('customer/account/editProfile');
        res.locals.user.loginName = user[0].USER_NAME;
        res.locals.user.loginAddress = user[0].USER_ADDRESS;
        res.locals.user.loginPhone = user[0].USER_PHONE;
        res.locals.user.loginBirthday = user[0].USER_BIRTHDAY;
        return user[0];
    }
    else {
        res.render('customer/home/index');
        return null;
    }
}

exports.editPassword = async (req, res) => {
    const user = await accountService.changePassword(req.body.changePassword, res.locals.user.editPassEmail)
    if (user) {
        res.render('account/changePass')
        res.locals.use.changePass = user[0].USER_PASSWORD;
        return user[0];
    }
    else {
        res.render('customer/account/editProfile');
        return null;
    }
}
// exports.changepass=async (req,res)=>{
//     try{
//         const email= await authService.getUserAccountByEmail()
//         if(!email){
//             res.status(200).json({ message: "Email not exit!" })
//         }
        
//         const  {  newpassword, confirmpass } = req.body
//         const id = req.params.id;
//         console.log("id " + id)
        

//         //console.log("id " + req.body.newpassword+ req.body.confirmpass)

//         //const data= {  newpassword, confirmpass } 
//         console.log(req.body)
//         if(newpassword!=confirmpass) res.status(200).json({ message: "New password and confirm password is not equal!" })
//         else {
//             //console.log(req.body)   
//             const hashedPassword = await bcrypt.hash(newpassword, 10);
            
//             await accountService.changepass(email,hashedPassword)
//             console.log(hashedPassword)
//             res.status(200).json({newpassword,confirmpass})    
//         }   
//     }
//     catch (error) {
//         res.status(400).json({ message: "Wrong detail!" })
//     }
// }

exports.sendMail= async (req, res) =>  {
    // console.log("acc: ");
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'infinitycoffee06@gmail.com',
        pass: 'ngdjrtpcqtucojbj',
      },
      tls: {
        ciphers: 'SSLv3',
        minVersion: 'TLSv1.2',
      },
    });
  
    const email = req.body.email;

    // Generate new pass
    const passLength = 6;
    let pass = '';
  
    for (let i = 0; i < passLength; i++) {
      pass += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }
  
    const check = await accountService.getUserByEmail(email);
  
    if (!check) {
      return res.status(200).json({ message: 'Email does not exist!' });
    }
    console.log("hihi")

    
    await accountService.resetpass(req.body.email,pass)
      
    console.log(check);
    
    const mailOptions = {
      from: 'infinitycoffee06@gmail.com',
      to: email,
      subject: 'Reset your password',
      text: `This is NEW PASSWORD: ${{pass}} \n Use this password for Login.\nKeep it secure, don't share it with anyone! \nThank you!!!`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error sending mail');
      } else {
        console.log('Pass sent: ' + info.response);
        return res.status(200).json({ email: req.body.email,pass});
      }
    });
  }


