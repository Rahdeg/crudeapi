const Album = require('../models/album');


exports.getAlbum=async(req,res)=>{
    const options={
        sort :{
            createdAt: 1,
        },
    };
    const data = await Album.find(options);
    if (data) {
        return res.status(200).send({success:true, album:data});
    }else{
        return res.status(400).send({success:false, msg:'Album not found'});
    }
   }



exports.saveAlbum=async (req,res)=>{
    const {name,image_url}= req.body;
    const newAlbum = Album({name,image_url});
    try {
       const savedAlbum = await newAlbum.save(); 
       return res.status(200).send({success:true, album:savedAlbum});
    } catch (error) {
        return res.status(400).send({success:false, msg:error});
    }
}

exports.getAlbumbyid=async (req,res)=>{
    Album.findById(req.params.id,(err,data)=>{
       if (err) {
           return  res.status(400).send({success:false, msg:'data not found'});
       }

       if (data) {
           return  res.status(200).send({success:true, album:data});
       }
   })
}

exports.deleteAlbum= async (req,res)=>{
   Album.findByIdAndDelete(req.params.id,(err, data)=>{
       if (data) {
           return  res.status(200).send({success:true, album:'deleted'}); 
       }
       if (err) {
           return  res.status(400).send({success:false, msg:'data not found'});
       }
   })
}

exports.updateAlbum= async (req,res)=>{
    const {name,image_url}= req.body;
   Album.findByIdAndUpdate(req.params.id,{name,image_url} ,{new:true}, (err, data)=>{
       if (data) {
           return  res.status(200).send({success:true, album:data}); 
       }
       if (err) {
           return  res.status(400).send({success:false, msg:'data not found'});
       }
   })
}