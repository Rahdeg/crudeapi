const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

//create user
router.post('/', userController.create);

//retrieve * users
router.get('/', userController.findAll);

//retrieve a single user
router.get('/:id', userController.findOne);

//update a user (with id)
router.put('/:id', userController.update);

//delete a user
router.delete('/:id', userController.delete);




//srouter.post('/signup',userController.signUp);

//srouter.get('/', userController.getAll);


module.exports = router;