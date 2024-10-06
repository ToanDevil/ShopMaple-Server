const mongoose = require("mongoose");
const Order = require("../models/OrderModel");

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

const getUserOrder = (userID) => {
    return new Promise( async (resolve, reject) => {
        try {
            const objectId = new mongoose.Types.ObjectId(userID);
            const userOrders = await Order.aggregate([
                {
                  $lookup: {
                    from: "order_details",
                    localField: "orderDetailId",
                    foreignField: "_id",
                    as: "orderDetails"
                  }
                },
                { $unwind: "$orderDetails" },
                {
                  $unwind: "$orderDetails.items" // Giải nén từng item trong orderDetails
                },
                {
                  $lookup: {
                    from: "products",
                    localField: "orderDetails.items.productId",
                    foreignField: "_id",
                    as: "productDetails"
                  }
                },
                {
                  $addFields: {
                    "orderDetails.items.productDetail": {
                      $arrayElemAt: ["$productDetails", 0]
                    }
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    status: { $first: "$status" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    orderDetails: { $first: "$orderDetails" },
                    items: { $push: "$orderDetails.items" }
                  }
                },
                {
                  $addFields: {
                    "orderDetails.items": {
                      $map: {
                        input: "$items",
                        as: "item",
                        in: {
                          amount: "$$item.amount",
                          productId: "$$item.productId",
                          productDetail: "$$item.productDetail"
                        }
                      }
                    }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    orderDetails: 1,
                    items: 1
                  }
                },
                {
                  $match: { "orderDetails.userId": objectId }
                },
                {
                    $sort: { createdAt: -1 } // Sắp xếp theo ngày đặt hàng giảm dần
                }
            ]);              
            if(userOrders.length > 0){
                resolve({
                    status: "OK",
                    message: "success",
                    data: userOrders
                })
            }else {
                resolve({
                    status: "ERR",
                    message: "not found order",
                })
            }  
        } catch (err) {
            reject(err.message);
        }
    });
}

const getAllOrder = () => {
  return new Promise( async (resolve, reject) => {
      try {
          const userOrders = await Order.aggregate([
              {
                $lookup: {
                  from: "order_details",
                  localField: "orderDetailId",
                  foreignField: "_id",
                  as: "orderDetails"
                }
              },
              { $unwind: "$orderDetails" },
              {
                $unwind: "$orderDetails.items" // Giải nén từng item trong orderDetails
              },
              {
                $lookup: {
                  from: "products",
                  localField: "orderDetails.items.productId",
                  foreignField: "_id",
                  as: "productDetails"
                }
              },
              {
                $lookup: {
                  from: "users",
                  localField: "orderDetails.userId",
                  foreignField: "_id",
                  as: "userDetail"
                }
              },
              {
                $addFields: {
                  "orderDetails.items.productDetail": {
                    $arrayElemAt: ["$productDetails", 0]
                  },
                  "orderDetails.userDetail": {
                    $arrayElemAt: ["$userDetail", 0]
                  } 
                }
              },
              {
                $group: {
                  _id: "$_id",
                  status: { $first: "$status" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                  orderDetails: { $first: "$orderDetails" },
                  items: { $push: "$orderDetails.items" }
                }
              },
              {
                $addFields: {
                  "orderDetails.items": {
                    $map: {
                      input: "$items",
                      as: "item",
                      in: {
                        amount: "$$item.amount",
                        productId: "$$item.productId",
                        productDetail: "$$item.productDetail"
                      }
                    }
                  },
                }
              },
              {
                $project: {
                  _id: 1,
                  status: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  orderDetails: 1,
                  items: 1
                }
              },
              {
                  $sort: { createdAt: -1 } // Sắp xếp theo ngày đặt hàng giảm dần
              }
          ]);              
          if(userOrders.length > 0){
              resolve({
                  status: "OK",
                  message: "success",
                  data: userOrders
              })
          }else {
              resolve({
                  status: "ERR",
                  message: "not found order",
              })
          }  
      } catch (err) {
          reject(err.message);
      }
  });
}

const updateOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectId = new mongoose.Types.ObjectId(orderId);
      const order = await Order.findById(objectId)
      if(!order){
        reject("không tim thầy đơn đặt hàng!")
      }
      let newStatus
      if(order.status === "Pending"){
        newStatus = "Processing"
      }else if(order.status === "Processing"){
        newStatus = "Shipped"
      }else if(order.status === "Shipped"){
        newStatus = "Delivered"
      }else{
        reject("Invalid status transition")
      }

      // cập nhật trạng thái
      const updatedOrder = await Order.findByIdAndUpdate(objectId, 
        {$set : {status: newStatus}},
        {new: true}
      )

      if (updatedOrder) {
        resolve({
          status: 'OK',
          message: "Status updated successfully",
          data: updatedOrder
        });
      } else {
        reject("Order update failed");
      }
    } catch (error) {
      reject(error.message)
    }
  })
}


module.exports = {
    crateOrder,
    getUserOrder,
    getAllOrder,
    updateOrder
}