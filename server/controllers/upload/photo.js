// const cloudinary = require("cloudinary");
const aws = require("aws-sdk");
const upload = require("../../services/image-upload");
const S3Upload = upload.any();

const s3 = new aws.S3({
	endpoint: "sgp1.digitaloceanspaces.com",
	accessKeyId: process.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.AWS_ACCESS_KEY_SECRET
});

exports.S3Upload = function(req, res) {
	S3Upload(req, res, err => {
		console.log("request", req);
		if (err) {
			console.log("err", err);
			return res.status(422).send({
				erorrs: [{ title: "Image upload error", detail: err.message }]
			});
		}

		var files = req.files;

		console.log("files", req.files);
		results = files.map(file => {
			return {
				public_id: file.key,
				url: file.location
			};
		});

		res.status(200).send({
			success: true,
			results: results
		});
	});
};
exports.S3UploadSingle = function(req, res) {
	S3Upload(req, res, err => {
		if (err) {
			return res.status(422).send({
				erorrs: [{ title: "Image upload error", detail: err.message }]
			});
		}
		var file = req.file;
		const image = {
			public_id: file.key,
			url: file.location
		};

		res.status(200).send({
			success: true,
			result: image
		});
	});
};

exports.S3Delete = function(req, res) {
	const { imageId, productId } = req.params;
	console.log(imageId);
	console.log(productId);
	Product.findOneAndUpdate(
		{ _id: productId },
		{ $pull: { images: { public_id: imageId } } },
		{ upsert: true, new: true },
		(err, updatedProduct) => {
			console.log(updatedProduct);
			if (err) return res.json({ succes: false });
			res.status(200).send({ success: true, product: updatedProduct });
		}
	);
	var params = { Bucket: "estore", Key: imageId };
	s3.deleteObject(params, function(err, data) {
		if (err) console.log(err, err.stack);
		// error
		else console.log("deleted"); // deleted
	});
};

/**
 * CLOUDINARY
 */

// exports.singleUpload = function(req, res) {
// 	cloudinary.v2.uploader.upload(
// 		req.files.file.path,
// 		{
// 			use_filename: true,
// 			unique_filename: false,
// 			timeout: 120000,
// 			secure: true
// 		},
// 		function(error, result) {
// 			if (error) reject(error);
// 			else
// 				res.status(200).send({ public_id: result.public_id, url: result.url });
// 		}
// 	);
// };

// exports.CDphotoupload = async function(req, res) {
// 	// uploading all images at once
// 	let filesForUpload = [];
// 	for (const key in req.files) {
// 		if (req.files.hasOwnProperty(key)) {
// 			const element = req.files[key];
// 			filesForUpload.push(element);
// 		}
// 	}
// 	// res_promises will be an array of promises
// 	let res_promises = filesForUpload.map(
// 		file =>
// 			new Promise((resolve, reject) => {
// 				cloudinary.v2.uploader.upload(
// 					file.path,
// 					{ use_filename: true, unique_filename: false, secure: true },
// 					function(error, result) {
// 						if (error) reject(error);
// 						else
// 							resolve({ public_id: result.public_id, url: result.secure_url });
// 					}
// 				);
// 			})
// 	);
// 	// Promise.all will fire when all promises are resolved
// 	Promise.all(res_promises)
// 		.then(results => {
// 			res.status(200).send({
// 				success: true,
// 				results: results
// 			});
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// };

// exports.CDimagedelete = (req, res) => {
// 	const { imageId, productId } = req.params;

// 	console.log(imageId);
// 	console.log(productId);
// 	Product.findOneAndUpdate(
// 		{ _id: productId },
// 		{ $pull: { images: { public_id: imageId } } },
// 		{ upsert: true, new: true },
// 		(err, updatedProduct) => {
// 			console.log(updatedProduct);
// 			if (err) return res.json({ succes: false });
// 			res.status(200).send({ success: true, product: updatedProduct });
// 		}
// 	);

// 	cloudinary.uploader.destroy(imageId, (error, result) => {
// 		if (error) {
// 			console.log(error);
// 		}
// 	});
// };
