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
        const { orderId } = req.body
        const data =  await OrderService.updateOrder(orderId)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err})
    }
}

const getUserOrder = async (req, res) => {
    try {
        
        const {userId} = req.query
        const data = await OrderService.getUserOrder(userId)
        return res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error})
    }
}
 

module.exports = {
    updateOrder,
    cancelOrder,
    getUserOrder,
    getAllOrder
}