const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        username: {type: String},
        name: { type: String},
        email: {type: String},
        password: { type: String, require: true },
        isAdmin: {type: Boolean, default: false },
        phone: {type: Number, require: true},
        avatar: { type: String },
        sex: { type: Number },
        dob: { type: Date },
        address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
        facebookId: { type: String},
        access_token: {type: String },
        refresh_token: {type: String }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User