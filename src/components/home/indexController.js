const async = require('hbs/lib/async');
const indexService = require('./indexService');

exports.index = async (req, res) => {
    if (req.user != undefined) {
        if (req.user.loginRole == 1) {
            console.log("admin")
            const weekRevenue = await indexService.getCurrentWeekRevenue()
            const monthRevenue = await indexService.getCurrentMonthRevenue()
            const yearRevenue = await indexService.getCurrentYearRevenue()
            const bestSeller = await indexService.getBestSellerProduct()
            res.render('admin/dashboard/dashboard.hbs', { layout: 'layoutAdmin.hbs', weekRevenue: weekRevenue, monthRevenue: monthRevenue, yearRevenue: yearRevenue, bestSeller: bestSeller })
        } else {
            console.log("customer")
            res.render('customer/home/index');
        }
    } else {
        res.render('customer/home/index');
    }

}