const Task = require('../models/task');

exports.getTask = (req, res)=> {
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

exports.addTask = (req, res) => {
  // create a new task
  const { id, user, todo, created_on } = req.body;
  const task = new Task(id, user, todo, created_on);
  
  // save new task in database
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else res.status(200).send(data);
  });
};