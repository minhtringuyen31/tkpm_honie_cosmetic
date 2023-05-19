const accountService = require('./userService');

exports.getAll = async (req, res) => {
    if (req.user.loginRole == 1) {
        const result = await accountService.getAll()
        console.log(result)
        res.render('admin/user/userList', { layout: "layoutAdmin", result });
    } else {
        res.redirect('/index')
    }
}    