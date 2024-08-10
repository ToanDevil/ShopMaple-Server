const CategoryProduct = require("../models/CategoryProduct")
const { default: mongoose } = require("mongoose")

const createCategoryProduct = (name) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const check = await CategoryProduct.findOne({
                name: name
            })
            if(!check){
                const createType = await CategoryProduct.create({
                    name: name
                })
                if(createType){
                    resolve({
                        status: "OK",
                        message: "success",
                        data: createType
                    })
                }else {
                    // Nếu không tạo được người dùng, reject với thông báo lỗi
                    resolve({
                        status: 'ERR',
                        message: "Lỗi Server"
                    });
                }
            }else{
                resolve({
                    status: 'ERR',
                    message: "Loại sản phẩm này đã tồn tại!"
                });
            }
        }catch(err){
            reject(err)
        }
    })
}

const getCategoryProducts = () => {
    return new Promise(async (resolve, reject)=>{
        try{
            const typeProducts = await CategoryProduct.find()
            resolve({
                status: "OK",
                data: typeProducts
            })
        }catch(err){
            reject(err)
        }
    })
}

const getCategoryProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                resolve({
                    status: "OK",
                    message: "typeProductID không hợp lệ"
                });
            }
            const typeProduct = await CategoryProduct.findById(id)
            resolve({
                status: "OK",
                data: typeProduct
            })
        }catch(err){
            reject(err.message)
        }
    })
}

const deleteCategoryProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                resolve({
                    status: "ERR",
                    message: "typeProductID không hợp lệ"
                });
            }
            await CategoryProduct.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "Xóa thành công",
            })
        }catch(err){
            reject(err.message)
        }
    })
}

module.exports = {
    createCategoryProduct,
    getCategoryProducts,
    getCategoryProductById,
    deleteCategoryProduct
}