const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '10s'})

    return access_token
}
const generateRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '7d'})

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
                
                const newToken = await generateAccessToken({
                    id: user.id,
                    isAdmin: user.isAdmin
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