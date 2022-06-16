const Task = require('../models/task');

exports.getTask = (req,res)=> {
    Task.getALL((err,data)=>{
        if (err) {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while getting users."
              });
        } else {
            res.send(data);
        }
    })
}