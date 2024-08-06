const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        username: {type: String},
        name: { type: String},
        email: {type: String},
        password: { type: String, require: true },
        isAdmin: {type: Boolean, default: false, require: true},
        phone: {type: Number, require: true},
        avatar: { type: String, require: true},
        sex: { type: Number, require: true},
        dob: { type: Date, require: true},
        address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
        access_token: {type: String, require: true},
        refresh_token: {type: String, require: true}
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User