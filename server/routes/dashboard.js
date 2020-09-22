const express = require("express");
const router = express.Router();
const controllers = require("../controllers/dashboard");

/* GET dashboard by region page. */
router.post("/", controllers.fetchAll);
router.get("/", controllers.fetchByRegion);
router.get("/map", controllers.fetchMap);
module.exports = router;
