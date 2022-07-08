const express = require("express");
const router = express.Router();

const artistcontroller = require('../controllers/artist');

router.get('/get',artistcontroller.getArtist);
router.get('/get/:id',artistcontroller.getArtistbyid);
router.post('/save',artistcontroller.saveArtist);
router.delete('/delete/:id',artistcontroller.deletArtist);
router.put('/update/:id',artistcontroller.updateArtist);


module.exports = router;