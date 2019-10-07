const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

const s3 = new aws.S3({
	endpoint: "sgp1.digitaloceanspaces.com",
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});

// initiate s3 object with s3 config

// file checking function
// const fileFilter = (req, file, cb) => {
// 	// if mimetype of file is not jpeg or png . return error
// 	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
// 		cb(null, true);
// 	} else {
// 		cb(new Error("Invalid file type "), false);
// 	}
// };

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
			console.log("file", file);
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, `${Date.now().toString()}`);
		}
	})
});

module.exports = upload;
