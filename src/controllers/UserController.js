const UserService = require('../Services/UserService')
const JwtService = require('../Services/JwtService')

const createUser = async(req,res) => {
    try{
        const { name, email, phone, password } = req.body
        if (phone.toString().length !== 10 || isNaN(phone)) {
            return res.status(400).json({
                message: "Bạn cần nhập số điện thoại hợp lệ"
            });
        }
        const data =  await UserService.createUser(req.body)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const loginUser = async(req, res) => {
    try{
        const { phone, password } = req.body
        if (phone.toString().length !== 10 || isNaN(phone)) {
            return res.status(400).json({
                message: "Bạn cần nhập số điện thoại hợp lệ"
            });
        }
        const data =  await UserService.loginUser(req.body)
        return res.status(200).json({data: data})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            res.status(200).json({message: "Yêu cầu userID"})
        }
        const data = req.body
        const dataUser = await UserService.updateUser(userId, data)
        return res.status(200).json({data: dataUser})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const deleteUser = async (req,res) => {
    try{
        const userId = req.params.id
        if(!userId){
            res.status(200).json({message: "Yêu cầu userID"})
        }
        const dataUser = await UserService.deleteUser(userId)
        return res.status(200).json({data: dataUser})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const getUser = async (req,res) => {
    try{
        const userId = req.params.id
        if(!userId){
            res.status(200).json({message: "Yêu cầu userID"})
        }
        const dataUser = await UserService.getUser(userId)
        return res.status(200).json({data: dataUser})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const getAllUser = async (req,res) => {
    try{
        const dataUser = await UserService.getAllUser()
        return res.status(200).json({data: dataUser})
    }catch(err){
        res.status(400).json({message: err})
    }
}

const refreshToken = async (req,res) => {
    try{
        const token = req.headers.token
        if(!token){
            return res.status(200).json({message: "Token không hợp lệ"})
        }
        const response = await JwtService.refreshAccessToken(token)
        return res.status(200).json({data: response})
    }catch(err){
        res.status(400).json({message: err})
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
    refreshToken
}