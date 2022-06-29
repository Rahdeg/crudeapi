const express = require('express');
const router = express.Router();
const upload= require('../multer')

const imageController = require('../controllers/image');


router.post('/', upload.single('image'),imageController.create);

router.get('/',imageController.getPics);

router.get('/:id',imageController.GetpixID);

router.delete('/:id',imageController.deleteimage);

router.put('/:id',upload.single('image'),imageController.editimage);






module.exports = router;