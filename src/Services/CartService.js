const Cart = require("../models/CartModel")

const addItemInCart = (data, productId) => {
    return new Promise( async (resolve, reject) => {
        const { amount, userId } = data;

        try {
            const checkExist = await Cart.findOne({ userId: userId });

            if (!checkExist) {
                const newCart = await Cart.create({
                    userId: userId,
                    items: [{ amount, productId }]
                });

                resolve({
                    status: "OK",
                    message: "Added to cart",
                    data: newCart
                });
            } else {
                
                const existingItem = checkExist.items.find(item => item.productId.equals(productId));
                if (existingItem) {
                    existingItem.amount += amount;
                } else {
                    checkExist.items.push({ amount, productId });
                }

                await checkExist.save();

                resolve({
                    status: "OK",
                    message: "Added to cart",
                    data: checkExist
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}

const getAllItem = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: userId }).populate('items.productId');

            if (!cart) {
                resolve({
                    status: "OK",
                    message: "Giỏ hàng trống",
                    data: []
                });
            } else {
                resolve({
                    status: "OK",
                    message: "Lấy tất cả các mục trong giỏ hàng thành công",
                    data: cart.items
                });
            }
        } catch (err) {
            reject({
                status: "ERR",
                message: err.message
            });
        }
    });
};

const deleteItemInCart = (productId) => {
    return new Promise( async(resolve, reject) => {
        try {   
            const checkItem = await Cart.findOne({
                "items.productId": productId
            })  
            if(!checkItem){
                resolve({
                    status: "ERR",
                    message: "Sản phẩm không tồn tại"
                })
            }else{
                await Cart.findOneAndUpdate(
                    { "items.productId": productId },
                    { $pull: { items: { productId } } },
                    { new: true }
                );
                resolve({
                    status: "OK",
                    message: "Xóa thành công"
                })
            } 
        } catch (error) {
            reject({
                status: "ERR",
                message: error.message
            })
        }
    })
}

const deleteManyItemInCart = (productIDs) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Sử dụng $pull để xóa các item trong giỏ hàng có productId nằm trong danh sách productIDs
            await Cart.updateOne(
                { $pull: { items: { productId: { $in: productIDs } } } }
            );

            resolve({
                status: "OK",
                message: "Xóa thành công",
            });
        } catch (err) {
            reject(err);
        }
    });
};

const updateAmount = (productId, data) => {
    return new Promise( async(resolve, reject) => {
        try {
            const { amount } = data;
            if (amount > 0) {
                // Cập nhật số lượng sản phẩm trong giỏ hàng
                const cartData = await Cart.findOneAndUpdate(
                    { "items.productId": productId },
                    { $set: { "items.$.amount": amount } },
                    { new: true }
                );
                resolve({
                    status: "OK",
                    message: "Cập nhật số lượng thành công",
                    data: cartData
                });
            }else{
                reject({
                    status: "ERR",
                    message: "Số không hợp lệ"
                });
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: error.message
            });
        }
    })
}

module.exports = {
    addItemInCart,
    deleteItemInCart,
    getAllItem,
    updateAmount,
    deleteManyItemInCart
}