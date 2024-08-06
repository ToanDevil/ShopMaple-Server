const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema(
    {
        homeNumber: {type: String},
        phone: {type: String},
        name: {type: String},
        commune: {type: String},
        district: { type: String},
        city: {type: String},
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        addressMain: {type: Boolean}
    },
    {
        timestamps: true
    }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address