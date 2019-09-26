const express = require("express");
const router = express.Router();
const {
	register,
	login,
	auth,
	logout,
	fbLogin
} = require("../../controllers/user");
const { authMiddleware } = require("../../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/fblogin", fbLogin);
router.get("/auth", authMiddleware, auth);
router.get("/logout", authMiddleware, logout);

module.exports = router;
