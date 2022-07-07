const express = require("express");
const router = express.Router();
const artistController = require('../controllers/user');

router.get('/login', artistController.getuser);



module.exports=router;