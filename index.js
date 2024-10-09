const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const routes = require("./src/routers");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')



const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())


routes(app)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    });


app.listen(port , () =>{
    console.log("Sever is running ", port)
})
