const Address = require('../models/AddressUser');
const { default: mongoose } = require("mongoose")

const createAddress = (address) => {
    return new Promise(async (resolve, reject) => {
        const { homeNumber, commune, district, city, userId, phone, name, addressMain } = address; 
        try {
            const checkMainAddress = await Address.countDocuments({addressMain:true})
            if(checkMainAddress>1){
                await Address.updateMany({ addressMain: true }, { addressMain: false });
            }
            const createdAddress = await Address.create({
                homeNumber: homeNumber,
                commune: commune,
                district: district,
                city: city,
                userId: userId,
                phone: phone,
                name: name,
                addressMain: addressMain 
            });
            console.log(createdAddress);
            if (createdAddress) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createdAddress
                });
            } else {
                resolve({
                    status: 'ERR',
                    message: "Lỗi Server"
                });
            }
        } catch (err) {
            reject({
                status: 'ERR',
                message: err.message
            });
        }
    });
};

const updateAddress = (id, data) => {
    return new Promise(async (resolve, reject) => { 
        try {
            const checkMainAddress = await Address.countDocuments({addressMain:true})
            if(checkMainAddress>0){
                await Address.updateMany({ addressMain: true }, { addressMain: false });
            }
            const updatedAddress = await Address.findByIdAndUpdate(id, data, {new:true})
            resolve({
                status: "OK",
                message: "Cập nhật thành công",
                data: updatedAddress
            })
        } catch (err) {
            reject({
                status: 'ERR',
                message: err.message
            });
        }
    });
};

const getAddressById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Address.find({userId})
            if(data.length > 0){
                resolve({
                    status: "OK",
                    message: "success",
                    data: data
                });
            }
            else{
                const data = await Address.find({_id: userId})
                resolve({
                    status: "OK",
                    message: "success",
                    data: data
                });
            }
        } catch (error) {
            reject({
                status: 'ERR',
                message: error.message
            })
        }
    })
}

const deleteAddressById = (addressId) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!mongoose.Types.ObjectId.isValid(addressId)) {
                resolve({
                    status: "OK",
                    message: "addressID không hợp lệ"
                });
            }
            await Address.findByIdAndDelete(addressId)
            resolve({
                status: "OK",
                message: "Xóa thành công",
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    createAddress,
    getAddressById,
    deleteAddressById,
    updateAddress
};
