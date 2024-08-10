const express = require('express')
const router = express.Router()
const addressController = require('../controllers/AddressController')

router.post('/add_address', addressController.createAddress)
router.get('/:id', addressController.getAddressById)
router.delete('/delete/:id', addressController.deleteAddressById)
router.put('/update/:id', addressController.updateAddressById)


module.exports = router