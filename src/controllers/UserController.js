const UserService = require('../Services/UserService')
const JwtService = require('../Services/JwtService')
const axios = require('axios');

const createUser = async(req,res) => {
    try{
        const { phone, password } = req.body
        if (phone.toString().length !== 10 || isNaN(phone)) {
            return res.status(400).json({
                message: "Bạn cần nhập số điện thoại hợp lệ"
            });
        }
        const response =  await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(err){
        res.status(400).json({message: err})
    }
}

const loginUser = async(req, res) => {
    try{
        const { phone, password } = req.body
        if(!phone || !password){
            return res.status(200).json({
                message: "Bạn cần nhập số điện thoại và mật khẩu"
            })
        }
        if (phone.toString().length !== 10 || isNaN(phone)) {
            return res.status(200).json({
                message: "Bạn cần nhập số điện thoại hợp lệ"
            });
        }
        const response =  await UserService.loginUser(req.body)
        const {refresh_token, ...newResponse} = response 

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true, // Bắt buộc phải có để gửi qua HTTPS
            sameSite: 'none', // Để cookie có thể hoạt động cross-site
            // maxAge: 24 * 60 * 60 * 1000 // Cookie tồn tại trong 1 ngày
        })
        return res.status(200).json(newResponse)
    }catch(err){
        res.status(400).json({message: err})
    }
}

const loginFacebook = async (req, res) => {
    try {
        const { accessToken } = req.body;
        console.log("accessToken", accessToken)
        if (!accessToken) {
            return res.status(200).json({
                message: "Không có access token từ Facebook."
            });
        }

        // Gửi request đến Facebook để lấy thông tin người dùng
        const userInfo = await getUserInfoFromFacebook(accessToken);

        if (!userInfo) {
            return res.status(400).json({
                message: "Xác thực Facebook thất bại."
            });
        }

        // Tìm hoặc tạo người dùng trong database dựa trên thông tin từ Facebook
        const user = await UserService.findOrCreateUserFromFacebook(userInfo);
        console.log("user", user)

        // Tạo JWT token và refresh token như bình thường
        const response = await UserService.loginUserWithFacebook(user);

        const { refresh_token, ...newResponse } = response;

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return res.status(200).json(newResponse);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};



const getUserInfoFromFacebook = async (accessToken) => {
    try {
        // Gửi request tới Facebook Graph API để lấy thông tin người dùng
        const response = await axios.get(
            `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
        );
        
        // Trả về dữ liệu người dùng
        return response.data;
    } catch (error) {
        console.error("Error fetching user info from Facebook:", error);
        return null;
    }
};


const updateUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            res.status(200).json({message: "Yêu cầu userID"})
        }
        const data = req.body
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
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
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
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
        const response = await UserService.getUser(userId)
        return res.status(200).json(response)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const getAllUser = async (req,res) => {
    try{
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }catch(err){
        res.status(400).json({message: err})
    }
}

const refreshToken = async (req,res) => {
    try{
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(200).json({message: "Token không hợp lệ"})
        }
        const response = await JwtService.refreshAccessToken(token)
        return res.status(200).json(response)
    }catch(err){
        res.status(400).json({message: err})
    }
}

const logoutUser = async (req,res) => {
    try{
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Đăng xuất thành công'
        })
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
    refreshToken,
    logoutUser,
    loginFacebook
}