var express = require("express");
const {
  registerUser,
  verifyEmail,
  accountVerify,
  login,
  passwordReset,
  updateUser,
  deleteUser,
  getUserById,
} = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
var router = express.Router();

router.post("/register-user", registerUser);
router.post("/reset-password", authMiddleware, passwordReset);
router.get("/account-verify/:id/:token", accountVerify);
router.post("/login", login);
router.put("/update-user/:id", updateUser);
router.delete("/remove-user", authMiddleware, deleteUser);
router.get("/get-user", authMiddleware, getUserById);



module.exports = router;
