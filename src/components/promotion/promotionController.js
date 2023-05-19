const promotionService = require('./promotionService');


exports.getAll = async (req, res) => {
    const result = await promotionService.getAll()
    if (result) {

    } else {

    }
}
