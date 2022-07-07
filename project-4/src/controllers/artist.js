const admin = require('../../config/firebase.config')
const User = require('../models/user');
const newUserData = require('../Database/Newdata');
const updateUserData = require('../Database/Updatedata');



exports.getartist=async (req,res)=>{
  if (!req.headers.authorization) {
    return res.status(500).send({message:"Invalid Token"})
  }
const token = req.headers.authorization.split(' ')[1];
try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
        return res.status(500).json(decodeValue);  
    }else{
        const userexist= await User.findOne({"user_id" : decodeValue.user_id});
        if (!userexist) {
          newUserData(decodeValue,req,res); 
        }else{
          updateUserData(decodeValue,req,res);
        }
    }
} catch (error) {
    return res.status(500).send({message:error})
}

}


exports.saveartist=(req,res)=>{
   
}