const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup',userController.signup);

router.post('/signin',userController.signin);

router.get('/', userController.getAll);

router.get('/:id', userController.getAllById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);


module.exports =router;