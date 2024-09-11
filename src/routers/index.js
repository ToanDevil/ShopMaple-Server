const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const addressRouter = require('./addressRouter')
const categoryProductRouter = require('./categoryProductRouter')
const orderRouter = require('./orderRoute')
const orderDetailRouter = require('./orderDetailRoute')
const cartRouter = require('./cartRouter')

const routes = (app)=>{
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/address', addressRouter)
    app.use('/api/category-product', categoryProductRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/order-detail', orderDetailRouter)
    app.use('/api/cart', cartRouter)
}

module.exports = routes