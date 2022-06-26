const db = require('../utils/database');

class Images{
    constructor(image){
        this.image = image;
    }

    static createImage(newImage,results){
        db.query("INSERT INTO images  VALUES (NULL,?)",[newImage.image],(err,data)=>{
            if (err) {
                console.log(err,'error inserting image')
                results(null,err);
                return;
            }
            console.log('image created successfully',{...newImage})
            results(null,{id:data.insertId,...newImage})
        })
    }

    static getALL(result) {
        db.query("SELECT * FROM images", (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
          } else {
            console.log("todos: ", res);
            result(null, res);
          }
        });
      }

      static getpixbyid(id,result) {
        db.query("SELECT * FROM images WHERE id = ?", id,(err, res) => {
          if (err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // if not found
        result({ kind: "not_found"}, null);
        });
      }

      static delete(id, cb){
        db.query(`DELETE FROM images WHERE id = ?`,id,(err, res)=>{
            if (err){
                return cb(err, null)
            }
            return cb(null, {
                msg:"image deleted successfully",
                id:id
            })
        })
    }
    static editById(id, image, result){
        db.query(
          "UPDATE images SET image=? WHERE id=?",
          [image, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            if (res.affectedRows == 0) {
              //not found
              result({ kind: "not_found" }, null);
              return;
            }
            console.log("image updated");
            result(null, {
              msg:"image updated successfully",
              id:id,
              image:image
          });
          }
        );
      }
}

module.exports =Images;