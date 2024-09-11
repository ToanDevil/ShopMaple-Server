const express = require('express')
const router = express.Router()
const cartController = require('../controllers/CartController')

router.post('/add/:productId', cartController.addItemInCart)
router.delete('/delete/:productId', cartController.deleteItemInCart)
router.get('/get-all-item/:userId', cartController.getAllItem)
router.put('/update-amount/:productId', cartController.updateAmount)
router.put('/delete-many', cartController.deleteManyItemInCart) 


module.exports = router