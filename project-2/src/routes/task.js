const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");

//update task by id
router.put("/:id", taskController.update);
router.get("/", taskController.getTask);

// filterBy can be [completed] or [notCompleted]
router.get("/filter/:filterBy", taskController.filterTasks);

// router.put('/:id', taskController.update);


router.delete('/:id', taskController.deleteTask)
module.exports = router;
