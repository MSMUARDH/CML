var express = require("express");
const {
  addingComment,
  getAllCommentsByLocationDetails,
  getAllCommentsByLocationDetailsforAdmin,
} = require("../Controllers/CommentController");
const authMiddleware = require("../middleware/authMiddleware");
var router = express.Router();

router.post("/adding-comment/:postid", authMiddleware, addingComment);
router.get(
  "/get-comments/:postid",
  authMiddleware,
  getAllCommentsByLocationDetails
);

router.get(
  "/get-comments-admin/:postid",
  getAllCommentsByLocationDetailsforAdmin
);


module.exports = router;
