const express = require("express");
const router = express.Router();
const userController = require("../controllers/todo");

//update task by id
router.put('/:id', todoController.update);

module.exports = router