const promotionService = require('./promotionService');

exports.showPromotionList = async (req, res) => {
    if (req.user != undefined) {
        if (req.user.loginRole == 0) {
            res.render('customer/promotion/promotionList');
        } else {
            if (req.user.loginRole == 1) {
                const result = await promotionService.getAllPromotion()
                console.log(result)
                res.render('admin/promotion/promotion_list', { layout: 'layoutAdmin.hbs', result })
            } else {
                res.redirect('/index')
            }
        }
    } else {
        res.redirect('/auth/sign')
    }
}

exports.createPromotion = async (req, res) => {
    console.log(req.body)
    const name = req.body.promotion_name
    const description = req.body.promotion_description
    const discount = req.body.promotion_discount
    const start_date = req.body.promotion_start_date
    const end_date = req.body.promotion_end_date
    const image = ""
    console.log(name + description)

    const result = await promotionService.createPromotion(name, description, discount, start_date, end_date, image);
    console.log(result)
    if (result) {
        res.json(result)
    }
    else {
        console.log(500);
    }
}

exports.editPromotion = async (req, res) => {
    console.log(req.body)
    const id = req.body.edit_promotion_id
    const name = req.body.edit_promotion_name
    const description = req.body.edit_promotion_description
    const discount = req.body.edit_promotion_discount
    const start_date = req.body.edit_promotion_start_date
    const end_date = req.body.edit_promotion_end_date
    const image = ""
    console.log(name + description)

    const result = await promotionService.editPromotion(id, name, description, discount, start_date, end_date, image);
    console.log(result)
    if (result) {
        console.log("YES")
        res.json(result)
    }
    else {
        console.log(500);
    }
}

exports.removePromotion = async (req, res, next) => {
    if (req.user == undefined) {
        next();
    }
    if (req.user.loginRole != 1) {
        next();
    }
    const promotionId = req.params.id
    console.log("promotionId: " + promotionId)
    const result = await promotionService.removePromotion(promotionId)
    res.json(result)
}

exports.background_getDetail = async (req, res, next) => {
    if (req.user == undefined) {
        next();
    }
    if (req.user.loginRole != 1) {
        next();
    }

    const promotionId = req.params.id
    console.log("bg_detail: " + promotionId)
    const result = await promotionService.getAPromotion(promotionId);
    console.log(result)
    res.json(result)
}

exports.updatePromotion = async (req, res) => {
    const id = req.params.id;
    const { name, description, discount, start_date, end_date } = req.body;

    const updatePromotion = await promotionService.updatePromotion(id, name, description, discount, start_date, end_date);
    if (updatePromotion) {
        res.status(200).json(updatePromotion)
    }
    else {
        res.status(500).json(error);
    }
}
exports.deletePromotion = async (req, res) => {
    const id = req.params.id;
    const status = await promotionService.deletePromotion(id);
    if (status) {
        res.redirect('/promotion');

    }
    else {
        res.status(500).json(error);
    }
}
exports.getAllPromotion = async (req, res) => {
    const promotions = await promotionService.getAllPromotion();
    if (promotions) {
        res.status(200).json(promotions)
    }
    else {
        res.status(500).json(error);
    }

}
exports.getPromotionByID = async (req, res) => {
    const id = req.params.id;
    const promotion = await promotionService.getPromotionByID(id);
    if (promotion) {
        // console.log("hgggggh"+promotion)
        res.status(200).json(promotion);
    }
    else {
        res.status(200).json({ message: "Promotion not found" });
    }

}

exports.applyPromotion = async (req, res) =>
{
    if(req.user == undefined)
    {
        res.redirect('/auth/sign')
    }
    const promotionId = req.params.id
    console.log("promotionId applied: " + promotionId)
    const selected_promotion = await promotionService.getPromotionByID(promotionId)
    res.redirect('/cart/checkout')
}

