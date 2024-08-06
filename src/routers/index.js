const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const addressRouter = require('./addressRouter')

const routes = (app)=>{
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/address', addressRouter)
}

module.exports = routes