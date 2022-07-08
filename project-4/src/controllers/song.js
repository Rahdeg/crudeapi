
const Song = require("../models/song");

exports.getSongs=async(req,res)=>{
    const options={
        sort :{
            createdAt: 1,
        },
    };
    const data = await Song.find(options);
    if (data) {
        return res.status(200).send({success:true, song:data});
    }else{
        return res.status(400).send({success:false, msg:'Data not found'});
    }
   }


exports.saveArtist=async (req,res)=>{
    const {name,image_url,song_url,album,artist,language,category}= req.body;
    const newSong = Song({name,image_url,song_url,album,artist,language,category});
    try {
       const savedSong = await newSong.save(); 
       return res.status(200).send({success:true, song:savedSong});
    } catch (error) {
        return res.status(400).send({success:false, msg:error});
    }
}

exports.getSongbyid=async (req,res)=>{
     Song.findById(req.params.id,(err,data)=>{
        if (err) {
            return  res.status(400).send({success:false, msg:'song not found'});
        }

        if (data) {
            return  res.status(200).send({success:true, song:data});
        }
    })
}

exports.deleteSong= async (req,res)=>{
    Song.findByIdAndDelete(req.params.id,(err, data)=>{
        if (data) {
            return  res.status(200).send({success:true, song:'deleted'}); 
        }
        if (err) {
            return  res.status(400).send({success:false, msg:'song not found'});
        }
    })
}

exports.updateSong= async (req,res)=>{
    const {name,image_url,song_url,album,artist,language,category}= req.body;
    Song.findByIdAndUpdate(req.params.id,{name,image_url,song_url,album,artist,language,category} ,{new:true}, (err, data)=>{
        if (data) {
            return  res.status(200).send({success:true, song:data}); 
        }
        if (err) {
            return  res.status(400).send({success:false, msg:'song not found'});
        }
    })
}