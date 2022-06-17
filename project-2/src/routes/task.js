const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');

router.get('/', taskController.getTask);

router.post('/', taskController.addTask);


module.exports = router;
