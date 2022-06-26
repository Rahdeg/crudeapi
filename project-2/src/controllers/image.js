const Images =require('../models/image');
const cloudinary = require('../config/cloudinaryconfig');
const path = require('path');
const fs = require('fs')




exports.create =async (req, res)=>{
    if (!req.file ) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      const image= result.url;
      const img = new Images(image)
    Images.createImage(img,(err,data)=>{
        if (err) {
            res.status.send({
                message: err.message || "Some error occurred",
            }); 
            return;
        }
        res.status(200).send(data);
        console.log(data)
    })
}

exports.getPics = (req, res) => {
    Images.getALL((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while getting users.",
        });
      } else {
        res.send(data);
      }
    });
  };
  exports.GetpixID = (req, res) => {
    Images.getpixbyid(Number(req.params.id),(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.deleteimage = async(req,res)=>{
    Images.delete(req.params.id,(err, data)=>{
        if (err){
            return res.status(400).send({err});
        }
        return res.status(200).send(data);
    })
}

exports.editimage =async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
      const image= result.url;
    Images.editById(
      Number(req.params.id),
      image,
      (err, data) => {
         if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating image with id " + req.params.id
            });
          }
        } else res.send(data)
      } 
      
    );
  }