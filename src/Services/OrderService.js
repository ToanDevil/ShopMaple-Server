const Order = require("../models/OrderModel")

const crateOrder = (data) => {
    return new Promise( async (resolve, reject) => {
        const { orderDetailId, status } = data;

        try {
            const order = await Order.create({
                orderDetailId: orderDetailId,
                status: status
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
    crateOrder,
}