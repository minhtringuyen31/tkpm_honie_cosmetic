const promotionRepository = require('./promotionRepository');

exports.createPromotion= async(
    name,
    description,
    discount,
    start_date,
    end_date,
    quantity,
    code,
    file
  )=> {
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
      end_date == '' ||
      quantity == null ||
      quantity == '' ||
      code == null ||
      code == '' ||
      file == ''
    ) {
      cloudinary.uploader.destroy(file.filename);
      return false;
    } else {
      return await promotionRepository.createPromotion(
        name,
        description,
        discount,
        start_date,
        end_date,
        file.path,
        quantity,
        code
      );
    }
  }

exports.updatePromotion=  async (
    id,
    name,
    description,
    discount,
    start_date,
    end_date,
    image,
    quantity,
    code
  )=> {
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
      end_date == '' ||
      quantity == null ||
      quantity == '' ||
      code == null ||
      code == '' ||
      image == ''
    ) {
      cloudinary.uploader.destroy(image.filename);
      return false;
    } else {
      return await promotionRepository.updatePromotion(
        id,
        name,
        description,
        discount,
        start_date,
        end_date,
        image.path,
        quantity,
        code
      );
    }
  }
exports.deletePromotion = async (id) =>{
    return await promotionRepository.deletePromotion(id);
  }
  exports.getPromotionByID=  async (id) =>{
    return await promotionRepository.getPromotionByID(id);
  }
  exports.getAllPromotion=  async ()=>{
    return await promotionRepository.getAllPromotion();
  }


