const express = require("express");
const router = express.Router();
const uploadControllers = require("../../controllers/upload/photo");
const { authMiddleware } = require("../../middlewares/auth");

router.post("/s3", authMiddleware, uploadControllers.S3Upload);
router.post("/s3single", authMiddleware, uploadControllers.S3UploadSingle);
router.post(
	"/s3/delete/:productId/:imageId",
	authMiddleware,
	uploadControllers.S3Delete
);
module.exports = router;
