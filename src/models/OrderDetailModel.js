const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema(
    {
        items: [
            {
                amount: {type: Number, require: true},
                productId: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',require: true},
            } 
        ],
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
        addressId:{type: mongoose.Schema.Types.ObjectId, ref: 'Address', require: true},
        orderPrice: {type: Number, require: true}, 
        shippingPrice: {type: Number, require: true},
        taxPrice: {type: Number, require: true},
        payMethod: {type: String, require: true},
        totalPrice: {type: Number, require: true},
    },
    {
        timestamps: true
    }
);

const Order_Detail = mongoose.model('Order_Detail', orderDetailSchema)
module.exports = Order_Detail