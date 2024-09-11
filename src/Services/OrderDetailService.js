const Order_Detail = require("../models/OrderDetailModel")

const crateDetailOrder = (data, userId) => {
    return new Promise( async (resolve, reject) => {
        const { items, orderPrice, totalPrice, shippingPrice, taxPrice, payMethod, addressId } = data;
        
        try {
            const order = await Order_Detail.create({
                items,
                orderPrice,
                totalPrice,
                shippingPrice,
                taxPrice,
                addressId,
                payMethod,
                userId
            })
            if(order){
                resolve({
                    status: "OK",
                    message: "success",
                    data: order
                })
            }else {
                // Nếu không tạo được sản phẩm, reject với thông báo lỗi
                reject("Lỗi Server");
            }  
        } catch (err) {
            reject(err);
        }
    });
}


module.exports = {
    crateDetailOrder,
}