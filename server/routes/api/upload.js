const express = require("express");
const router = express.Router();
const uploadControllers = require("../../controllers/upload/photo");
const { authMiddleware } = require("../../middleware/auth");

router.post("/", authMiddleware, uploadControllers.S3Upload);

module.exports = router;
