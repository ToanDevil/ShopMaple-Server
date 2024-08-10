const CategoryProductService = require('../Services/CategoryProductService')

const createCategoryProduct = async (req, res) => {
    try {
        const {name} = req.body
        const response = await CategoryProductService.createCategoryProduct(name)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getCategoryProducts = async (req, res) => {
    try {
        const response = await CategoryProductService.getCategoryProducts()
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getCategoryProductById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await CategoryProductService.getCategoryProductById(id)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteCategoryProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({message: "Yêu cầu CategoryProductID"});
        }
        const response = await CategoryProductService.deleteCategoryProduct(id)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createCategoryProduct,
    getCategoryProducts,
    getCategoryProductById,
    deleteCategoryProduct
}