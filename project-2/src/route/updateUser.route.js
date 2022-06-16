const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); 

//update a user (with id)
router.put('/:id', userController.update);