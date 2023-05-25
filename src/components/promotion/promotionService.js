const promotionRepository = require('./promotionRepository');
const fs = require("fs")
const path = require("path")

validExtension_ofPictures = 
{
    _jpeg: "jpeg",
    _jpg: "jpg",
    _png: "png",
    _svg: "svg"
}

const uploadPath = path.join(__dirname, '../../public/img/promotion/');



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
    image = getImagePathByPromotionId(id)
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



function getImagePathByPromotionId(promotion_id)
{
    console.log(uploadPath)
    let promotionImg_path = null
    if(fs.existsSync(uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._jpeg) === true)
    {
        promotionImg_path = uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._jpeg;
    }
    else if(fs.existsSync(uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._jpg) === true)
    {
        promotionImg_path = uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._jpg;
    }
    else if(fs.existsSync(uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._png) === true)
    {
        promotionImg_path = uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._png;
    }
    else if(fs.existsSync(uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._svg) === true)
    {
        promotionImg_path = uploadPath+"promotion_"+promotion_id+"."+validExtension_ofPictures._svg;
    }

    //fit the absolute path -> (public) /image/...
    if(promotionImg_path != null)
    {
        let start = promotionImg_path.indexOf('promotion');
        start = promotionImg_path.indexOf('\\', start);
        promotionImg_path = promotionImg_path.substring(start+1);

        while(promotionImg_path.includes('\\'))
        {
            promotionImg_path = promotionImg_path.replace('\\','/');
        }
    }

    return promotionImg_path;
}