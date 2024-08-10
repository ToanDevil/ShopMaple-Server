const mongoose = require('mongoose');

const categoryProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    {
        timestamps: true
    }
);

const CategoryProduct = mongoose.model('CategoryProduct', categoryProductSchema);

module.exports = CategoryProduct;
