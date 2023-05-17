// const mongoose = require('mongoose');
// require('dotenv').config();
// mongoose.connect(process.env.MOGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function () {
//     console.log('Connected to group 07 database to get Product');
// });

const coll  = db.collection('SERUM');

async function insertProductData() {
    try {
        const result = await coll.insertMany([
            {
                "id": "SR1",
                "name": "Innisfree Green Tea Seed Serum 30 mL",
                "brand": "Innisfree",
                "origin": "Korea",
                "factory": "Korea",
                "skin types": "Dry skin, Oily skin lacks moisture, Sensitive skin",
                "skin problem": "Dry, sensitive",
                "price": "310000",
                "img": "/img/product/SR1.jpg"
            },
            {
                "id": "SM2",
                "name": "Serum Skin1004 Madagascar Centella Ampoule 55ml",
                "brand": "Skin1004",
                "origin": "Korea",
                "factory": "Korea",
                "skin types": "Sensitive skin",
                "skin problem": "Dry, sensitive",
                "price": "333000",
                "img": "/img/product/SR2.jpg"
            },
            {
                "id": "SM3",
                "name": "Huxley Essence; Brightly Ever After 30ml",
                "brand": "Huxley",
                "origin": "Korea",
                "factory": "Korea",
                "skin types": "Many skin types",
                "skin problem": "Dark skin, Olive skin",
                "price": "512000",
                "img": "/img/product/SR3.jpg"
            },
            {
                "id": "SM4",
                "name": "Bio-essence Bio-Bird's Nest Collagen 1000 Essence 30ml",
                "brand": "Bio-essence",
                "origin": "Singapore",
                "factory": "Malaysia",
                "skin types": "Many skin types",
                "skin problem": "Olive skin, Dark skin, Dry skin",
                "price": "429000",
                "img": "/img/product/SR4.jpg"
            }
        ]);
        
        console.log("insert successfully");
    } catch (error) {
        console.log('err', + error)
    }
}

insertProductData();