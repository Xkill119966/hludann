const { User } = require("../models/users/User");
const { Donor } = require("../models/users/Donor");
const { Traveller } = require("../models/users/Traveller");
const { Local } = require("../models/users/Donor");
const { getAccountkitData } = require("../services/facebookAccountkit");

const register = function (req, res) {
	//Register Type
	const userType = req.query.type;

	let { email, password, username, phone } = req.body;

	if (!email || !password || !username || !phone) {
		return res.status(402).send({
			errors: [{ title: "Data missing!", detail: "Please Provide Data!" }]
		});
	}

	user = new User({
		username: username,
		email: email,
		password: password,
		phone: phone,
		user_type: userType
	});

	User.findOne({ email: email }, (err, userFound) => {
		let error = {};

		if (userFound) {
			error.email = "email is already in used";
			return res.status(500).json({
				success: false,
				errors: error
			});
		} else {
			/**
			 * userType (depend on user type which user is Donar , Traveller, Local)
			 */
			user.save((err, userDoc) => {
				if (err) {
					error.err = "user information is save in error";
					return res.status(500).json({
						success: false,
						errors: error
					});
				} else {
					switch (userType) {
						case "DONOR":
							const donor = new Donor({
								user_id: userDoc._id
							});

							donor.save((err, donor) => {
								if (err) {
									error.err = "saving donor error";
									return res.status(500).json({
										success: false,
										errors: error
									});
								} else {
									userDoc.generateToken((err, user) => {
										if (err) {
											error.err = "something went wrong in generate token";
											return res.status(500).json({
												success: false,
												errors: error
											});
										}

										res.status(200).send({ success: true, token: user.token });
									});
								}
							});

							break;
						case "TRAVELLER":
							const traveller = new Traveller({
								user_id: userDoc._id
							});

							traveller.save((err, traveller) => {
								console.log("err", err);
								if (err) {
									console.log(err);

									error.err = "something went wrong in saving traveller";
									return res.status(500).json({
										success: false,
										errors: error
									});
								} else {
									userDoc.generateToken((err, user) => {
										if (err) {
											error.err = "something went wrong in generate token";
											res.status(500).json({
												success: false,
												errors: error
											});
										}

										res.status(200).send({
											success: true,
											token: user.token
										});
									});
								}
							});
							break;
						case "LOCAL":
							const local = new Local({
								user_id: userDoc._id
							});

							local.save((err, local) => {
								if (err) {
									error.err = "something went wrong in register";
									return res.status(500).json({
										success: false,
										errors: error
									});
								} else {
									userDoc.generateToken((err, user) => {
										if (err) {
											error.err = "something went wrong in generate token";
											return res.status(500).json({
												success: false,
												errors: error
											});
										}

										res.status(200).send({
											success: true,
											token: user.token
										});
									});
								}
							});
							break;
						default:
							break;
					}
				}
			});
		}
	});
};

const accountkitLogin = (req, res) => {
	// call accountkit service function and get phonenumber and access token
	getAccountkitData(req.body.code, phone => {
		User.findOne({ email: phone }, (err, user) => {
			if (!user) {
				const user = new User({
					email: phone,
					username: "customer"
				});

				user.save((err, userDoc) => {
					if (err) {
						return res.json({ success: false, errors: true });
					}

					// res.status(200).json({ success: true })
					userDoc.generateToken((err, user) => {
						if (err) {
							return res.status(400).send(err);
						}

						res.send({ loginSuccess: true, token: user.token });
					});
				});
			} else {
				res.send({ loginSuccess: true, token: user.token });
			}
		});
	});
};
const login = function (req, res) {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: "Auth Failed , user not found "
			});
		}

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({ loginSuccess: false, message: "Wrong password" });
			}

			user.generateToken((err, user) => {
				if (err) {
					return res.status(400).send(err);
				}

				res.send({ loginSuccess: true, token: user.token });
			});
		});
	});
};

const fbLogin = function (req, res) {
	const { email, name, accessToken } = req.body;

	// TO-DO
	// what if user change email in facebook ??
	// check accessToken and it matches but no email , we would replace token and give access to it .

	User.findOne({ "facebook.email": email }, (err, user) => {
		if (!user) {
			const user = new User({
				facebook: {
					username: name,
					email: email,
					accessToken: accessToken
				}
			});

			user.save((err, userDoc) => {
				if (err) {
					return res.json({
						success: false,
						errors: normailizeErrors(err.errors)
					});
				}

				// res.status(500).json({ success: true })
				userDoc.generateToken((err, user) => {
					if (err) {
						return res.status(400).send(err);
					}

					res.send({ loginSuccess: true, token: user.token });
				});
			});
		} else {
			res.send({ loginSuccess: true, token: user.token });
		}
	});
};

const auth = function (req, res) {
	if (!req.user.facebook) {
		res.status(200).json({
			email: req.user.email,
			username: req.user.username,
			isAuth: true,
			authType: "local"
		});
	} else {
		res.status(200).json({
			email: req.user.facebook.email,
			username: req.user.facebook.username,
			isAuth: true,
			authType: "facebook"
		});
	}
};

const logout = function (req, res) {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: "" },
		(err, updateUser) => {
			if (err) {
				return res.json({ success: false, err });
			}
			return res.status(200).send({
				success: true
			});
			console.log("success");
		}
	);
};

module.exports = {
	logout,
	auth,
	fbLogin,
	register,
	login
};
