const promotionRepository = require('./promotionRepository');

exports.createPromotion = async (
  name,
  description,
  discount,
  start_date,
  end_date,
  image
) => {
  if (
    name == null ||
    name == '' ||
    description == null ||
    description == '' ||
    discount == null ||
    discount == '' ||
    start_date == null ||
    start_date == '' ||
    end_date == null ||
    end_date == ''
  ) {
    // cloudinary.uploader.destroy(file.filename);
    return false;
  } else {
    return await promotionRepository.createPromotion(
      name,
      description,
      discount,
      start_date,
      end_date,
      image
    );
  }
}

exports.editPromotion = async (
  id,
  name,
  description,
  discount,
  start_date,
  end_date,
  image
) => {
  if (
    id == null ||
    id == '' ||
    name == null ||
    name == '' ||
    description == null ||
    description == '' ||
    discount == null ||
    discount == '' ||
    start_date == null ||
    start_date == '' ||
    end_date == null ||
    end_date == ''
  ) {
    console.log("1")
    // cloudinary.uploader.destroy(image.filename);
    return false;
  } else {
    console.log("2")
    return await promotionRepository.editPromotion(
      id,
      name,
      description,
      discount,
      start_date,
      end_date,
      image
    );
  }
}

exports.removePromotion = async (promotionId) => {
  return await promotionRepository.removePromotion(promotionId);
}
exports.getPromotionByID = async (id) => {
  return await promotionRepository.getPromotionByID(id);
}
exports.getAllPromotion = async () => {
  return await promotionRepository.getAllPromotion();
}

exports.getAPromotion = async (promotionId) => {
  return result = await promotionRepository.getAPromotion(promotionId);

}


