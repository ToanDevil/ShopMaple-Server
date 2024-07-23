const Product = require("../models/ProductModel")


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject)=>{
        const { name, image, type, price, quantity, description } = newProduct
        try{
            if(!name || !image || !type || !price || !quantity || !description){
                resolve({
                    status: "ERR",
                    message: "Vui lòng điền đầy đủ thông tin (name, image, type, price, description)"
                })
            }
            const checkProduct = await Product.findOne({
                name: name
            })  
            if(checkProduct){
                resolve({
                    status: "ERR",
                    message: "Sản phẩm đã tồn tại"
                })
            }else{
                const createProduct = await Product.create({
                    name: name,
                    image: image,
                    type: type,
                    price: parseInt(price),
                    quantity: parseInt(quantity),
                    description: description
                })
                console.log(createProduct)
                if(createProduct){
                    resolve({
                        status: "OK",
                        message: "success",
                        data: createProduct
                    })
                }else {
                    // Nếu không tạo được sản phẩm, reject với thông báo lỗi
                    reject("Lỗi Server");
                }    
            } 
        }catch(err){
            reject(err)
        }
    })
}

const updateProduct = (data, productID) => {
    return new Promise(async (resolve, reject)=>{
        const { name, image, type, price, quantity, description } = data
        try{
            const checkProduct = await Product.findOne({
                _id: productID 
            })  
            if(!checkProduct){
                resolve({
                    status: "ERR",
                    message: "Sản phẩm không tồn tại"
                })
            }else{
                const updateProduct = await Product.findByIdAndUpdate(productID, {
                    name: name,
                    image: image,
                    type: type,
                    price: parseInt(price),
                    quantity: parseInt(quantity),
                    description: description
                }, {new:true})
                if(updateProduct){
                    resolve({
                        status: "OK",
                        message: "success",
                        data: updateProduct
                    })
                }else {
                    // Nếu không tạo được người dùng, reject với thông báo lỗi
                    reject("Lỗi Server");
                }    
            } 
        }catch(err){
            reject(err)
        }
    })
}

const deleteProduct = (productID) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: productID 
            })  
            if(!checkProduct){
                resolve({
                    status: "OK",
                    message: "Sản phẩm không tồn tại"
                })
            }else{
                await Product.findByIdAndDelete(productID)
                resolve({
                    status: "OK",
                    message: "Xóa thành công"
                })
            } 
        }catch(err){
            reject(err)
        }
    })
}

const getProductByID = (productID) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: productID 
            })  
            if(!checkProduct){
                resolve({
                    status: "OK",
                    message: "Sản phẩm không tồn tại"
                })
            }else{
                const getProduct = await Product.findById(productID)
                resolve({
                    status: "OK",
                    message: "Xóa thành công",
                    data: getProduct
                })
            } 
        }catch(err){
            reject(err)
        }
    })
}

const getAllProduct = (limit, page, minPrice, maxPrice, type, search) => {
    return new Promise(async (resolve, reject) => {
        try{
            let condition = {};

            if (minPrice || maxPrice || type) {
                condition.price = { $gte: minPrice || 0, $lte: maxPrice || 10e9 };
                if (type) {
                    condition.$or = [{ type: { $regex: new RegExp(type, "i") } }];
                }
            } else if (search) {
                condition.name = { $regex: new RegExp(".*" + search + ".*", "i") };
            }

            const total = await Product.countDocuments(condition);
            const productData = await Product.find(condition).limit(limit).skip(page * limit);

            resolve( {
                status: "OK",
                data: productData,
                total: total,
                currentPage: parseInt(page) + 1,
                totalPage: Math.ceil(total / limit)
            });
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByID,
    getAllProduct
}