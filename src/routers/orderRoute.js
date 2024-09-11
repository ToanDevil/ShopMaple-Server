const express = require('express')
const router = express.Router()
const orderController = require('../controllers/OrderController')

router.delete('/cancel-order', orderController.cancelOrder)
router.put('/update-status', orderController.updateOrder)


module.exports = router