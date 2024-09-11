const OrderService = require('../Services/OrderService')


const cancelOrder = async (req, res) => {
    try{
        const { orderDetailId} = req.params.orderDetailId
        const data =  await OrderService.cancelOrder(orderDetailId)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const updateOrder = async (req, res) => {
    try{
        const { orderDetailId} = req.params.orderDetailId
        const data =  await OrderService.updateOrder(orderDetailId)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}
 

module.exports = {
    updateOrder,
    cancelOrder
}