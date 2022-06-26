
const Task = require("../models/task");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const {  user_id, todo} = req.body;
  const task = new Task( user_id, todo);

  Task.createTask(task, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
      return;
    }
    res.status(200).send(data);
  });
};


exports.getTask = (req, res) => {
  Task.getALL((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting users.",
      });
    } else {
      res.send(data);
    }
  });
};



exports.getTaskById = (req, res) => {
  Task.getALLById(Number(req.params.id),(err, data) => {
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

exports.getTaskByUserId = (req, res) => {
  Task.getALLByUserId(Number(req.params.id),(err, data) => {
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

// Expected parameter: filterBy
// Options for the parameter: "completed" or "notCompleted"
exports.filterTasks = (req, res) => {
  let { filterBy } = req.params;

  //   Handle when the filter is not specified
  if (!filterBy) {
    return res.status(500).send({
      status: false,
      message:
        "FilterBy is required. Valid options are [completed] or [notCompleted]",
    });
  }

  //   Handle when the filterBy is not among the expected options
  if (["true", "false"].includes(filterBy) === false) {
    return res.status(500).send({
      status: false,
      message:
        "Please give a valid filter option. true or false",
    });
  }
  if (filterBy== "true") {
    filterBy = 1;
  }else {filterBy= 0;}

  Task.filterTask(filterBy, (err, data) => {
    if (err) {
      return res.status(500).send({
        status: false,
        message: err || "Some error occurred while filtering the todos",
      });
    } else {
      return res.status(200).send({
        status: true,
        todosCount: data.length,
        todos: [...data],
      });
    }
  });
};


exports.deleteTask = (req,res)=>{
    Task.delete(req.params.id,(err, data)=>{
        if (err){
            return res.status(400).send({err});
        }
        return res.status(200).send(data);
    })
}

exports.edit = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const {todo} = req.body;
  Task.editById(
    Number(req.params.id),
    todo,
    (err, data) => {
       if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.id
          });
        }
      } else res.send(data)
    } 
    
  );
}

exports.updateTask = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const {status} = req.body;
  Task.updateStatus(
    Number(req.params.id),
    status,
    (err, data) => {
       if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.id
          });
        }
      } else res.send(data)
    } 
    
  );
}

