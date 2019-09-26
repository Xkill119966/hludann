const { User } = require("../models/users/User");

let authMiddleware = (req, res, next) => {
	let token = req.headers.authorization.split(" ")[1];

	User.findByToken(token, (err, user) => {
		if (err) {
			throw err;
		}

		if (!user) {
			return res.json({
				isAuth: false,
				error: true
			});
		}

		req.token = token;
		req.user = user;
		next();
	});
};

module.exports = { authMiddleware };
