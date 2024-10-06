const express = require('express')
const router = express.Router()
const orderController = require('../controllers/OrderController')
const { authMiddleware } = require('../middleWare/authmiddleware')

router.get('/getOrderByUserID', orderController.getUserOrder)
router.delete('/cancel-order', orderController.cancelOrder)
router.put('/update-status', authMiddleware, orderController.updateOrder)
router.get('/getAllOrder', authMiddleware,  orderController.getAllOrder)


module.exports = router