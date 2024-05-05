const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const routes = require("./src/routers");
const bodyParse = require('body-parser');
const cors = require('cors')



const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParse.json())


routes(app)


mongoose.connect('mongodb://localhost:27017/maple')
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    });


app.listen(port , () =>{
    console.log("Sever is running ", port)
})
