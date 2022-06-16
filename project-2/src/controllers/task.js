const Task = require("../models/task");

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

// Expected parameter: filterBy
// Options for the parameter: "completed" or "notCompleted"
exports.filterTasks = (req, res) => {
  const { filterBy } = req.params;

  //   Handle when the filter is not specified
  if (!filterBy) {
    return res.status(500).send({
      status: false,
      message:
        "FilterBy is required. Valid options are [completed] or [notCompleted]",
    });
  }

  //   Handle when the filterBy is not among the expected options
  if (["completed", "notCompleted"].includes(filterBy) === false) {
    return res.status(500).send({
      status: false,
      message:
        "Please give a valid filter option. [completed] or [notCompleted]",
    });
  }

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
