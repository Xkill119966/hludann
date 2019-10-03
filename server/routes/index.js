const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const config = require("../config/index");
// API routes
const userRoutes = require("./api/user");

module.exports = function(app) {
	// const accessLogStream = fs.createWriteStream(
	// 	path.join(`${__dirname}/..`, "access.log"),
	// 	{ flags: "a" }
	// );
	var whitelist = [process.env.FRONTEND_URL];
	var corsOptionsDelegate = function(req, callback) {
		var corsOptions;
		if (whitelist.indexOf(req.header("Origin")) !== -1) {
			corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
		} else {
			corsOptions = { origin: true, credentials: true }; // disable CORS for this request
		}
		callback(null, corsOptions); // callback expects two parameters: error and options
	};

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	// app.use(morgan("combined", { stream: accessLogStream }));

	// CORS MIDDLEWARE
	app.use(cors(corsOptionsDelegate));

	/**
	 * SERVER REACT APPS IF IT IS NOT STANDALONE SERVER
	 */

	// const appPath = path.join(__dirname, "../../estorebkh", "build");
	// app.use(express.static(appPath));
	// app.get("/", function(req, res) {
	// 	res.sendFile(path.resolve(appPath, "index.html"));
	// });
	app.get("/favicon.ico", (req, res) => res.sendStatus(204));
	app.get("/", (req, res) => {
		res.json({ message: "HluDann Server running at 5006" });
	});

	app.use("/api/v1/users", userRoutes);
};
