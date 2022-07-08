const admin = require('../../config/firebase.config')
const User = require('../models/user');
const newUserData = require('../Database/Newdata');
const updateUserData = require('../Database/Updatedata');



exports.loginuser=async (req,res)=>{
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

exports.getUser=async(req,res)=>{
  const options={
      sort :{
          createdAt: 1,
      },
  };
  const data = await User.find(options);
  if (data) {
      return res.status(200).send({success:true, users:data});
  }else{
      return res.status(400).send({success:false, msg:' not user'});
  }
 }


 exports.getUserbyid=async (req,res)=>{
  User.findById(req.params.id,(err,data)=>{
     if (err) {
         return  res.status(400).send({success:false, msg:'user not found'});
     }

     if (data) {
         return  res.status(200).send({success:true, user:data});
     }
 })
}

exports.deleteUser= async (req,res)=>{
 User.findByIdAndDelete(req.params.id,(err, data)=>{
     if (data) {
         return  res.status(200).send({success:true, user:'deleted'}); 
     }
     if (err) {
         return  res.status(400).send({success:false, msg:'user not found'});
     }
 })
}

exports.updateUserRole= async (req,res)=>{
  console.log(req.body.data.role, req.params.userId);
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await User.findOneAndUpdate(filter, { role: role }, options);
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
}


exports.deleteUserRole=  (req,res)=>{
  User.findByIdAndDelete(req.params.id,(err, data)=>{
    const filter = { _id: req.params.userId };
    const songId = req.query;
  
    try {
      console.log(filter, songId);
      const result = User.updateOne(filter, {
        $pull: { favourites: songId },
      });
      res
        .status(200)
        .send({ success: true, msg: "Song removed from favourites" });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })
 }