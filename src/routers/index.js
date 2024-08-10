const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const addressRouter = require('./addressRouter')
const categoryProductRouter = require('./categoryProductRouter')

const routes = (app)=>{
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/address', addressRouter)
    app.use('/api/category-product', categoryProductRouter)
}

module.exports = routes