const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//update user by ID
router.put('/:id', userController.update);


router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
