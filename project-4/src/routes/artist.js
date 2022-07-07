const express = require("express");
const router = express.Router();
const artistController = require('../controllers/artist');

router.get('/login', artistController.getartist);

router.post('/', artistController.saveartist);

module.exports=router;