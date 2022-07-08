const Artist = require('../models/artist');


exports.getArtist=async(req,res)=>{
    const options={
        sort :{
            createdAt: 1,
        },
    };
    const data = await Artist.find(options);
    if (data) {
        return res.status(200).send({success:true, artist:data});
    }else{
        return res.status(400).send({success:false, msg:'Data not found'});
    }
   }


exports.saveArtist=async (req,res)=>{
    const {name,image_url,twitter,instagram}= req.body;
    const newArtist = Artist({name,image_url,twitter,instagram});
    try {
       const savedArtist = await newArtist.save(); 
       return res.status(200).send({success:true, artist:savedArtist});
    } catch (error) {
        return res.status(400).send({success:false, msg:error});
    }
}

exports.getArtistbyid=async (req,res)=>{
     Artist.findById(req.params.id,(err,data)=>{
        if (err) {
            return  res.status(400).send({success:false, msg:'data not found'});
        }

        if (data) {
            return  res.status(200).send({success:true, artist:data});
        }
    })
}

exports.deletArtist= async (req,res)=>{
    Artist.findByIdAndDelete(req.params.id,(err, data)=>{
        if (data) {
            return  res.status(200).send({success:true, artist:'deleted'}); 
        }
        if (err) {
            return  res.status(400).send({success:false, msg:'data not found'});
        }
    })
}

exports.updateArtist= async (req,res)=>{
    const {name,image_url,twitter,instagram}= req.body;
    Artist.findByIdAndUpdate(req.params.id,{name,image_url,twitter,instagram} ,{new:true}, (err, data)=>{
        if (data) {
            return  res.status(200).send({success:true, artist:data}); 
        }
        if (err) {
            return  res.status(400).send({success:false, msg:'data not found'});
        }
    })
}