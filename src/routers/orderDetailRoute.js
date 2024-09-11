const express = require('express')
const router = express.Router()
const orderDetailController = require('../controllers/OrderDetailController')

router.post('/add-detail-order/:userId', orderDetailController.createDetailOrder)


module.exports = router