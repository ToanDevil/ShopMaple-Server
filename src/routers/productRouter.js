const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const { authMiddleware } = require('../middleWare/authmiddleware')


router.post('/add-product', authMiddleware,  productController.createProduct)
router.put('/update-product/:id', authMiddleware,  productController.updateProduct)
router.delete('/delete-product/:id',authMiddleware,  productController.deleteProduct)
router.post('/deleteMany',authMiddleware,  productController.deleteManyProduct)
router.get('/detail-product/:id', productController.getProductByID)
router.get('/list-product',  productController.getAllProduct)
router.get('/list-product/:categoryId',  productController.getProductByCategoryId)

module.exports = router