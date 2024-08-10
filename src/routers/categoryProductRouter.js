const express = require('express');
const categoryProductController = require('../controllers/CategoryProductController');
const { authMiddleware } = require('../middleWare/authmiddleware')

const router = express.Router();

router.post('/add',authMiddleware, categoryProductController.createCategoryProduct);
router.get('/getAll', categoryProductController.getCategoryProducts);
router.get('/:id', categoryProductController.getCategoryProductById);
router.delete('/delete/:id',authMiddleware, categoryProductController.deleteCategoryProduct);

module.exports = router;
