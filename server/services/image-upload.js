const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

const s3 = new aws.S3({
	endpoint: "sgp1.digitaloceanspaces.com",
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});

// upload object to export or use as middleware
// configure with storage as "multerS3 object"
const upload = multer({
	// filter function

	// storage set up with s3 via multa-s3 library
	storage: multerS3({
		acl: "public-read",
		s3,
		bucket: "estore",
		metadata: function(req, file, cb) {
			// s3 url link sent back
			console.log("before s3", file);
			console.log("before s32", req);
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, `${req.user.username}_${req.user._id}_${Date.now().toString()}`);
		}
	})
});

module.exports = upload;
