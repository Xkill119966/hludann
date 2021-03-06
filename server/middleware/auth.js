const { User } = require("../models/users/User");

let authMiddleware = (req, res, next) => {
	let token = req.headers.authorization.split(" ")[1];
	console.log("Token", token);
	
	User.findByToken(token, (err, user) => {
		if (err) {
			throw err;
		}
		console.log("hhh",!user);
		

		if (!user) {
			return res.json({
				isAuth: false,
				error: true
			});
		}

		console.log("User", user);
		

		req.token = token;
		req.user = user;
		next();
	});
};

module.exports = { authMiddleware };
