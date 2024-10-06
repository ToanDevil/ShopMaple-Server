const CartService = require('../Services/CartService.js')


const addItemInCart = async(req,res) => {
    try{
        const { amount, userId} = req.body
        const productId = req.params.productId
        const data =  await CartService.addItemInCart(req.body, productId)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const getAllItem = async (req, res) => {
    try{
        const userId  = req.params.userId
        const data =  await CartService.getAllItem(userId)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const deleteItemInCart = async (req, res) => {
    try{
        const productId = req.params.productId
        const data =  await CartService.deleteItemInCart(productId)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const deleteManyItemInCart = async (req, res) => {
    try{
        const { productIds, userId } = req.body;
        const data =  await CartService.deleteManyItemInCart(req.body)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err})
    }
}

const updateAmount = async(req,res) => {
    try{
        const { amount} = req.body
        const productId = req.params.productId
        const data =  await CartService.updateAmount(productId, req.body)
        return res.status(200).json(data)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
module.exports = {
    addItemInCart,
    deleteItemInCart,
    getAllItem,
    updateAmount,
    deleteManyItemInCart
}