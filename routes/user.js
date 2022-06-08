const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup',userController.signUp);

router.get('/', userController.getAll);


module.exports =router;