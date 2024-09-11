const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                amount: {type: Number, require: true},
                productId: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',require: true},
            } 
        ],
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart