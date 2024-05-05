const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

    return access_token
}
const generateRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})

    return refresh_token
}

const refreshAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, process.env.REFRESH_TOKEN, async(err, user) => {
                if(err){
                    resolve({
                        status: "ERROR",
                        message: err
                    })
                }
                console.log(user)
                const {payload} = user
                const newToken = await generateAccessToken({
                    id: payload.id,
                    isAdmin: payload.isAdmin
                })
                resolve({
                    status:"OK",
                    token: newToken
                })
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshAccessToken
}