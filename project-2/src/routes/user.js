const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//update user by ID
router.put('/:id', userController.update);


module.exports = router;