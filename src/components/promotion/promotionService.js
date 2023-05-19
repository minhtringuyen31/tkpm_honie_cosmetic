const promotionRepository = require('./promotionRepository');

exports.getAll = async (promotion) => {
    return await promotionRepository.getAll();
}