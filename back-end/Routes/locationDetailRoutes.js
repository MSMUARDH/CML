var express = require("express");
const {
  createPosts,
  deleteLocationPost,
  getLocationDetailsByUserId,
  getAllLocationDetails,
} = require("../Controllers/LocationDetailsController");
const authMiddleware = require("../middleware/authMiddleware");
var router = express.Router();

// !packeges for the image uploading part
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add-post", upload.array("photo", 3), authMiddleware, createPosts);
router.delete("/delete-location-post/:postid", deleteLocationPost);
router.get("/get-location-details", authMiddleware, getLocationDetailsByUserId);
router.get("/get-all-location-details", getAllLocationDetails);





// router.put("/update-settings/:userid", updateSettings);
// router.patch(
//   "/update-background-image/:userid",
//   upload.single("image"),
//   updateBackgrounImage
// );
// router.delete("/delete-settings/:id", deleteSettings);
// router.get("/get-single-user-settings/:userid", getSingleUserSettings);


module.exports = router;
