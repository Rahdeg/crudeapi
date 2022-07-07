const User = require('../models/user');



const updateUserData = async(decodeValue,req,res)=>{
   const filter = {user_id :decodeValue.user_id};
   const option ={
    upsert : true,
    new :   true,
   }
    try {
      const result = await User.findOneAndUpdate(
        filter,
        {auth_time:decodeValue.auth_time},
        option
      );
      res.status(200).json({user: result});
    } catch (error) {
      res.status(500).send({success: false, msg: error});
    }
  }

  module.exports = updateUserData;