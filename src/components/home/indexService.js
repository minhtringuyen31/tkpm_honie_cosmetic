const async = require('hbs/lib/async')
const indexRepository = require('./indexRepository')


exports.getCurrentWeekRevenue = async () => {
    return await indexRepository.getCurrentWeekRevenue()
}

exports.getCurrentMonthRevenue = async () => {
    return await indexRepository.getCurrentMonthRevenue()
}

exports.getCurrentYearRevenue = async () => {
    return await indexRepository.getCurrentYearRevenue()
}

exports.getBestSellerProduct = async () => {
    return await indexRepository.getBestSellerProduct()
}

