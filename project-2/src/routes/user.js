const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");



router.put('/:id', userController.update);

router.get('/', userController.findAll);

router.get('/:id', userController.findOne);

router.post("/register",userController.register);

router.post("/login", userController.login);

router.delete('/:id', userController.delete);



module.exports = router;
