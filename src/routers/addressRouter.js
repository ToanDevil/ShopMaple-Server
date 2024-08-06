const express = require('express')
const router = express.Router()
const addressController = require('../controllers/AddressController')

router.post('/add_address', addressController.createAddress)
router.get('/:id', addressController.getAddressByUserId)
router.delete('/delete/:id', addressController.deleteAddressById)


module.exports = router