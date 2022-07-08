const express = require("express");
const router = express.Router();

const albumcontroller = require ('../controllers/album');

router.get('/get',albumcontroller.getAlbum);
router.get('/get/:id',albumcontroller.getAlbumbyid);
router.post('/save',albumcontroller.saveAlbum);
router.delete('/delete/:id',albumcontroller.deleteAlbum);
router.put('/update/:id',albumcontroller.updateAlbum);





module.exports = router;