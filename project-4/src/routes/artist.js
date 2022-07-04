const express = require("express");
const router = express.Router();
const artistController = require('../controllers/artist');

router.get('/:id', artistController.getartistbyid);

router.post('/', artistController.saveartist);

module.exports=router;