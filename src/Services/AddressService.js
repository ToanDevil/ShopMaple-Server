const Address = require('../models/AddressUser');
const { default: mongoose } = require("mongoose")

const createAddress = (address) => {
    return new Promise(async (resolve, reject) => {
        const { homeNumber, commune, district, city, userId, phone, name, addressMain } = address; 
        try {
            const checkMainAddress = await Address.countDocuments({addressMain:true, userId: userId})
            // console.log(checkMainAddress)
            if(checkMainAddress === 1 && addressMain){
                await Address.updateMany({ addressMain: true, userId: userId }, { addressMain: false }, {new: true});
            }
            let createdAddress = await Address.create({
                homeNumber: homeNumber,
                commune: commune,
                district: district,
                city: city,
                userId: userId,
                phone: phone,
                name: name,
                addressMain: checkMainAddress === 0 ? true : addressMain 
            });
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
            // console.log(data)
            const checkMainAddress = await Address.countDocuments({addressMain:true, userId: data.userId})
            if(checkMainAddress === 1 && data.addressMain){
                await Address.updateMany({ addressMain: true, userId: data.userId }, { addressMain: false }, {new: true});
            }
            const checkAddress = await Address.findById(id)
            if(checkAddress.addressMain && !data.addressMain){
                resolve({
                    status: "ERR",
                    message: "Bạn không thể sửa địa chỉ mặc định thành không phải địa chỉ mặc định!"
                })
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
            const checkMainAddress = await Address.countDocuments()
            const checkAddress = await Address.find({addressMain: true})
            if(checkMainAddress > 1 && checkAddress === addressId){
                resolve({
                    status: "ERR",
                    message: "Xóa hết địa chỉ phụ mới được xóa địa chỉ chính"
                })
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
