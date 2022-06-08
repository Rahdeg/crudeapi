require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app= express();
const bodyParser = require('body-parser');
const cookieParser= require('cookie-parser');




app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
//home route

app.get('/',(req,res)=>{
    res.send('Helo world')
})


//import routes
const userRoutes = require('./routes/user');
//create routes
app.use('/api/v1/user', userRoutes);
//create port
const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`APP is Running at port ${port}`)
})
