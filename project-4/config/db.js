const mongoose = require('mongoose');

const connectDB = ()=>{
    try {
         mongoose.connect(process.env.DB_STRING,{
            useNewUrlParser: true,
        });
        console.log('mongodb connection established')
    } catch (error) {
        console.log(error.message);
        process.exit(1); 
    }
}

module.exports =connectDB;