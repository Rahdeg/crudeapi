const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");

router.get("/", taskController.getTask);

// filterBy can be [completed] or [notCompleted]
router.get("/filter/:filterBy", taskController.filterTasks);

module.exports = router;
