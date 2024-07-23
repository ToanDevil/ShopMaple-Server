const ProductService = require('../Services/ProductService')


const createProduct = async(req,res) => {
    try{

        const { name,image, type, price, quantity, description} = req.body
        console.log(name, image, type, price, quantity, description)
        const data =  await ProductService.createProduct(req.body)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const updateProduct = async(req,res) => {
    try{
        const { name,image, type, price, quantity, description} = req.body
        const productID = req.params.id
        const data =  await ProductService.updateProduct(req.body, productID)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const deleteProduct = async(req,res) => {
    try{
        const productID = req.params.id
        const data =  await ProductService.deleteProduct(productID)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const getProductByID = async (req, res) => {
    try{
        const productID = req.params.id
        if(!productID){
            return res.status(400).json({message: "Yêu cầu productID"})
        }
        const data = await ProductService.getProductByID(productID)
        return res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const getAllProduct = async (req,res) => {
    try{
        const {limit, page, minPrice, maxPrice, type, search} = req.query
        const dataProduct = await ProductService.getAllProduct(limit || 10e9,page || 0, minPrice||0,maxPrice||10e9, type,search)
        return res.status(200).json(dataProduct)
    }catch(err){
        res.status(400).json({message: err})
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByID,
    getAllProduct
}