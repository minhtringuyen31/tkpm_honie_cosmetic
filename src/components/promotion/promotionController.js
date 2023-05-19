const promotionService = require('./promotionService');

exports.createPromotion=async(req,res)=>{
    const { name, description, discount, start_date, end_date }=req.body;
    

    const newPromotion=await promotionService.createPromotion(name, description, discount, start_date, end_date);
    if (newPromotion){
        res.redirect('/promotion');
    }
    else{
        console.log(500);
    }
}

exports.updatePromotion=async(req,res)=>{
    const id = req.params.id;
    const { name, description, discount, start_date, end_date }=req.body;

    const updatePromotion=await promotionService.updatePromotion(id,name, description, discount, start_date, end_date);
    if (updatePromotion){
        res.status(200).json(updatePromotion)
    }
    else{
        res.status(500).json(error);    }
}
exports.deletePromotion=async(req,res)=>{
    const id = req.params.id;
    const status = await promotionService.deletePromotion(id);
    if(status){
        res.redirect('/promotion');
    
    }
    else{
        res.status(500).json(error);
    }
}
exports.getAllPromotion=async(req,res)=>{
    const promotions = await promotionService.getAllPromotion();
    if (promotions){
        res.status(200).json(promotions)
    }
    else{
        res.status(500).json(error);
}

}
exports.getPromotionByID=async(req,res)=>{
    const id = req.params.id;
    const promotion = await promotionService.getPromotionByID(id);
    if (promotion){
        console.log("hgggggh"+promotion)
        res.status(200).json(promotion);
    }
    else{
        res.status(200).json({ message: "Promotion not found" });
    }

}

