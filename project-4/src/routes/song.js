const express = require("express");
const router = express.Router();

const songcontroller = require('../controllers/song');

router.get('/get',songcontroller.getSongs);
router.get('/get/:id', songcontroller.getSongbyid);
router.post('/save',songcontroller.saveArtist);
router.delete('/delete/:id', songcontroller.deleteSong);
router.put('/update/:id', songcontroller.updateSong);



module.exports = router;
