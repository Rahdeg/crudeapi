const express = require("express");
const router = express.Router();
const artistController = require('../controllers/user');

router.get('/login', artistController.loginuser);
router.get('/get', artistController.getUser);
router.get('/get/:id', artistController.getUserbyid);
router.delete('/delete/:id', artistController.deleteUser);
router.put('/role/:id', artistController.updateUserRole);

router.put('/favorite/:id', artistController.deleteUserRole);


module.exports=router;