const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        orderDetailId: {type: mongoose.Schema.Types.ObjectId, ref: 'Order_Detail', require: true},
        status: {type: String, require: true},
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema)
module.exports = Order