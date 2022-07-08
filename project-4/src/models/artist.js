const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required: true,
        },
        image_url :{
            type : String,
            required: true
        }, 
        twitter:{
            type : String,
            required: true,
        }, 
        instagram:{
            type : String,
            required: true,
        },
    },
    {timestamps:true}
)

module.exports = mongoose.model('artist',ArtistSchema);