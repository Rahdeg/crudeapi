const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');

router.get('/', taskController.getTask);

router.post('/', taskController.addTask);

//update task by id
router.put('/:id', taskController.update);

module.exports = router;
