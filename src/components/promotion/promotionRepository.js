const db = require('../connect_DB');


exports.getAllPromotion =async()=>{
    try{
        const poolPromise=db.promise();
        const [promotion]=await poolPromise.query("SELECT * FROM promotion ORDER BY id DESC");
        console.log(promotion);
        return promotion;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

exports.getPromotionByID =async(promotionId)=>{
    try{
        const poolPromise=db.promise();

        const [promotion]=await poolPromise.query("SELECT * FROM promotion WHERE id = ?",[promotionId]);
        console.log(promotion);
        return promotion[0];
    }
    catch(err){
        console.log(err);
        return false;
    }
}

exports.createPromotion= async (
    name,
    description,
    discount,
    start_date,
    end_date,
    image,
    quantity,
    code
  )=> {
    try {
        const poolPromise = db.promise();
        const values = [
            name,
            description,
            discount,
            start_date,
            end_date,
            image,
            quantity,
            code,
        ];
        const [promotion] = await poolPromise.query("INSERT INTO promotion (name, description, discount, start_date, end_date, image, quantity, code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [values]);
        console.log(promotion);
        return promotion;
    } catch (error) {
        console.error(error);
        return false;
    }
  },
 
 exports.updatePromotion =async (
    id,
    name,
    description,
    discount,
    start_date,
    end_date,
    image,
    quantity,
    code
  ) => {
    try{
        const poolPromise = db.promise();
        const values = [
            name,
            description,
            discount,
            start_date,
            end_date,
            image,
            quantity,
            code,
            id,
          ];
          const [promotion] = await poolPromise.query( "UPDATE promotion SET name=?, description=?, discount=?, start_date=?, end_date=?, image=?, quantity=?, code=? WHERE id=?",[values]);
   return promotion;
    }
    catch(err){
        console.log(err);
        return false;
    }
   

  },
  exports.deletePromotion= async (id) =>{

    try {
        const poolPromise = db.promise();
        await poolPromise.query("DELETE FROM promotion WHERE id=?",[id]);
        return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
