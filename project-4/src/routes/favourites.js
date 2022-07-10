const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favourites");

router.get("/favourites", favouritesController.getById);

router.put("/favourites", favouritesController.update);

module.exports = router;