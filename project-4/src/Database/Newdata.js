const User = require('../models/user');



const newUserData = async(decodeValue,req,res)=>{
    const newUser= new User({
      name : decodeValue.name,
      email : decodeValue.email,
      image_url : decodeValue.picture,
      user_id : decodeValue.user_id,
      email_verified : decodeValue.email_verified,
      role : "member",
      auth_time : decodeValue.auth_time
    })
    try {
      const saveduser = await newUser.save();
      res.status(200).json({user: saveduser});
    } catch (error) {
      res.status(500).send({success: false, msg: error});
    }
  }

  module.exports = newUserData;