const User = require("../models/UserModel")
const bcrypt = require('bcryptjs')
const { generateAccessToken, generateRefreshToken } = require("./JwtService")
const { default: mongoose } = require("mongoose")


const createUser = (newUser) => {
    return new Promise(async (resolve, reject)=>{
        const { phone, password} = newUser
        const parsedPhone = parseInt(phone)
        try{
            const checkPhone = await User.findOne({
                phone: parsedPhone
            })
            const hash = bcrypt.hashSync(password, 10)
            if(!checkPhone){
                const createUser = await User.create({
                    password: hash,
                    phone: parsedPhone
                })
                console.log(createUser)
                if(createUser){
                    resolve({
                        status: "OK",
                        message: "success",
                        data: createUser
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
                    message: "Số điện thoại đã có tài khoản"
                });
            }
        }catch(err){
            reject(err)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject)=>{
        const { phone, password} = userLogin
        try{
            const userData = await User.findOne({
                phone: parseInt(phone)
            })
            if(!userData){
                resolve({
                    status:"ERR",
                    message: "Kiểm tra lại tên đăng nhập hoặc mật khẩu"
                })
            }
            const comparePassword = bcrypt.compareSync(password, userData.password)
            if(!comparePassword){
                resolve({
                    status: "ERR",
                    message: "Kiểm tra lại mật khẩu"
                })
            }
            const access_token = await generateAccessToken({
                id: userData.id,
                isAdmin: userData.isAdmin
            })
            const refresh_token = await generateRefreshToken({
                id: userData.id,
                isAdmin: userData.isAdmin
            })
            resolve({
                status: "OK",
                message: "Đăng nhập thành công",
                access_token: access_token,
                refresh_token: refresh_token
            })
        }catch(err){
            reject(err)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                resolve({
                    status: "OK",
                    message: "userID không hợp lệ"
                });
            }
            const userData = await User.findByIdAndUpdate(id, data, {new:true})
            resolve({
                status: "OK",
                message: "Cập nhật thành công",
                data: userData
            })
        }catch(err){
            reject(err)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                resolve({
                    status: "OK",
                    message: "userID không hợp lệ"
                });
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "Xóa thành công",
            })
        }catch(err){
            reject(err)
        }
    })
}

const getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                resolve({
                    status: "OK",
                    message: "userID không hợp lệ"
                });
            }
            const userData = await User.findById(id)
            resolve({
                status: "OK",
                data: userData
            })
        }catch(err){
            reject(err.message)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const userData = await User.aggregate([
                {
                    $lookup: {
                        from: "addresses",
                        localField: "_id",
                        foreignField: "userId",
                        as: "addresses"
                    }
                },
                {
                    $project: {
                        username: 1,
                        name: 1,
                        email: 1,
                        isAdmin: 1,
                        phone: 1,
                        avatar: 1,
                        sex: 1,
                        dob: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        _id: 1,
                        mainAddress: {
                            $filter: {
                                input: "$addresses",
                                as: "address",
                                cond: { $eq: ["$$address.addressMain", true] }
                            }
                        }
                    }
                },
                {
                    $unwind: {
                        path: "$mainAddress",
                        preserveNullAndEmptyArrays: true  // Giữ người dùng nếu không có địa chỉ chính
                    }
                },
                {
                    $group: {
                        username: { $first: "$username" },
                        name: { $first: "$name" },
                        email: { $first: "$email" },
                        isAdmin: { $first: "$isAdmin" },
                        phone: { $first: "$phone" },
                        avatar: { $first: "$avatar" },
                        sex: { $first: "$sex" },
                        dob: { $first: "$dob" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        _id: "$_id",
                        mainAddress: { $first: "$mainAddress" }
                    }
                },
                {
                    $sort: { createdAt: -1 } // Sắp xếp theo ngày giảm dần
                }
            ])
            
            resolve({
                status: "OK",
                data: userData
            })
        }catch(err){
            reject(err)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
}