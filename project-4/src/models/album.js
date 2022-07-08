const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required: true,
        },
        image_url :{
            type : String,
            required: true
        },
    },
    {timestamps:true}
)

module.exports = mongoose.model('album',AlbumSchema);