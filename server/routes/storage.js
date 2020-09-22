const express = require("express");
const router = express.Router();
const controllers = require("../controllers/storage");

/* GET storage page. */
router.get("/", controllers.fetchAllStorages);
router.post("/", controllers.createStorage);
router.post("/:id/edit", controllers.updateStorage);
// router.get("/delete", controllers.deleteAllStorages);
// router.get("/:id", controllers.fetchStorageById);
// router.get("/:id/delete", controllers.deleteStorageById);

module.exports = router;
