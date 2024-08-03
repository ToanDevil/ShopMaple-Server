const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleware,authCusMiddleware } = require('../middleWare/authmiddleware')

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/sign-out', userController.logoutUser)
router.get('/:id', authCusMiddleware, userController.getUser)
router.put('/update-user/:id', userController.updateUser)
router.get('/admin/getAll',authMiddleware, userController.getAllUser)
router.delete('/admin/delete-user/:id', authMiddleware, userController.deleteUser)
router.post('/refresh-token', userController.refreshToken)

module.exports = router