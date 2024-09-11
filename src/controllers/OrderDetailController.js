const OrderDetailService = require('../Services/OrderDetailService.js')
const OrderService = require('../Services/OrderService.js')

const createDetailOrder = async(req,res) => {
    try {
        // Lấy thông tin chi tiết đơn hàng từ request body
        const { items, totalPrice, shippingPrice, taxPrice, orderPrice, payMethod, addressId, status } = req.body;
        const userId = req.params.userId;  

        const sanitizedItems = items.map(item => ({
            amount: item.amount,
            productId: item.productId._id || item.productId  // Sử dụng productId._id nếu productId là đối tượng
        }));

        // 1. Tạo chi tiết đơn hàng (Order Detail)
        const orderDetailData = await OrderDetailService.crateDetailOrder({
            items: sanitizedItems,
            totalPrice,
            shippingPrice,
            taxPrice,
            orderPrice,
            payMethod,
            addressId,
        }, userId);

        if (orderDetailData && orderDetailData.data) {
            const orderDetailId = orderDetailData.data._id; // Lấy orderDetailId của chi tiết đơn hàng vừa tạo

            // 2. Tạo đơn hàng (Order) với orderDetailId
            const orderData = await OrderService.crateOrder({
                orderDetailId: orderDetailId,
                status: status || "Pending"  // Gán trạng thái đơn hàng
            });

            return res.status(200).json(orderData);
        } else {
            return res.status(400).json({
                status: "Fail",
                message: "Failed to create order details"
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            message: err.message
        });
    }
};

const getDetailOrderbyUserId = async(req,res) => {
    try{
        const { userId } = req.params.productId
        const data =  await OrderDetailService.crateDetailOrder(req.body, userId)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err})
    }
}

module.exports = {
    createDetailOrder,
}