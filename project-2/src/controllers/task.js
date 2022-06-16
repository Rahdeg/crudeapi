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

exports.deleteTask = (req,res)=>{
    Task.delete(req.params.id,(err, data)=>{
        if (err){
            return res.status(400).send({err});
        }
        return res.status(200).send(data);
    })
}