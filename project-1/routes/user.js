const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

//create user
router.post('/signup',userController.signup);
//sign in user
router.post('/signin',userController.signin);
//get userr by id
router.get('/:id',userController.findOne)
//retrieve * users
router.get('/', userController.findAll);


//update a user (with id)
router.put('/:id', userController.update);

//delete a user
router.delete('/:id', userController.delete);






module.exports = router;