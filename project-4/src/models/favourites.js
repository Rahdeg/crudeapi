const mongoose = require("mongoose");

const FavouritesSchema = mongoose.Schema({
    song_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Favourites", FavouritesSchema);