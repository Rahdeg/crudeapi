const express = require("express");
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/:id', musicController.getMusicbyid);

router.post('/', musicController.savemusic);


module.exports = router;

