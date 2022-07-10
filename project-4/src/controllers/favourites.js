
const Favourites = require("../models/favourites");

exports.getById = async (req, res) => {
    Favourites.findById(req.songs._id, (err, data) => {
        if(err){
            return(err)
        }
        if(data){
            return res.status(200).send({
                success: true
            });
        }
    });
}

exports.update = async (req, res) => {
    Favourites.findByIdAndUpdate(req.songs._id, (err, data) => {
        if(data){
                return res.status(200).send({
                    success: true
                });
        }
        if(err){
            return(err)
        }
    });
}