const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {type: String, require: true, unique: true},
        image: { type: String, require: true},
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeProduct', required: true },
        price: {type: Number, require: true},
        quantity: {type: Number, require: true},
        rating: {type:Number},
        description: {type:String, require: true}
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema)
module.exports = Product