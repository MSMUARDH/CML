var express = require("express");
const {
  addSettings,
  deleteSettings,
  updateSettings,
  getSingleUserSettings,
  updateBackgrounImage,
  updateThemes,
} = require("../Controllers/SettingsController");
var router = express.Router();

// !packeges for the image uploading part
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authMiddleware = require("../middleware/authMiddleware");

// ! you need to set the image name as image to get it here(it's a middlware it should be in the route)
// upload.single("image");

router.post("/add-settings", upload.single("image"), addSettings);

// !background upload
router.post(
  "/update-background-image",
  authMiddleware,
  upload.array("photo", 1),
  updateBackgrounImage
);

router.put(
  "/update-settings/",
  upload.array("photo", 3),
  authMiddleware,
  updateSettings
);

router.put("/update-settings/themes", authMiddleware, updateThemes);


router.delete("/delete-settings/:id", deleteSettings);
router.get("/get-single-user-settings", authMiddleware, getSingleUserSettings);


module.exports = router;
