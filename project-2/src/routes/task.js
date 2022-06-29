const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");

//update task by id
router.put("/edit/:id", taskController.edit);
router.put('/update/:id', taskController.updateTask);


router.get("/", taskController.getTask);
router.get("/:id", taskController.getTaskById);
router.get("/user/:id", taskController.getTaskByUserId);


router.post("/", taskController.create);
// filterBy can be [completed] or [notCompleted]
router.get("/filter/:filterBy", taskController.filterTasks);

// router.put('/:id', taskController.update);


router.delete('/:id', taskController.deleteTask)
module.exports = router;
