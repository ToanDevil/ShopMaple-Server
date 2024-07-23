const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const { authMiddleware } = require('../middleWare/authmiddleware')


router.post('/add-product',  productController.createProduct)
router.put('/update-product/:id',  productController.updateProduct)
router.delete('/delete-product/:id',  productController.deleteProduct)
router.get('/detail-product/:id', productController.getProductByID)
router.get('/list-product',  productController.getAllProduct)

module.exports = router