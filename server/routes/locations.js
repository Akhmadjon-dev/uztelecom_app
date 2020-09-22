const express = require("express");
const router = express.Router();
const controllers = require("../controllers/locations");
const multer = require("../configs/multer");

/* GET home page. */
router.get("/", controllers.fetchAllLocations);
router.post("/", multer.single("file"), controllers.createLocation);
router.get("/delete", controllers.deleteAllLocations);
router.get("/:id", controllers.fetchLocationById);
router.post("/:id/edit", multer.single("file"), controllers.updateLocationById);
router.get("/:id/delete", controllers.deleteLocationById);

module.exports = router;
