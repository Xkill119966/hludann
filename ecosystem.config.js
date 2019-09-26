// pm2 config file for server setup
module.exports = {
	apps: [
		{
			name: "server",
			script: "./server/server.js",
			env: {
				NODE_ENV: "development",
				MONGO_URI: `mongodb://localhost:27017/server-dev`,
				STRIPE_PUBLICABLE_KEY: "",
				STRIPE_PUBLICABLE_KEY: ``,
				FACEBOOK_APP_ID: ``,
				FACEBOOK_APP_SECRET: ``,
				SECRET_KEY: ``,
				FRONTEND_URL: `http://localhost:3001`,
				FRONTEND_DASHBOARD_URL: `http://localhost:3000`,
				ACCOUNTKIT_SECRET: ``,
				AWS_ACCESS_KEY_ID: ``,
				AWS_ACCESS_KEY_SECRET: ``
			},
			env_production: {
				NODE_ENV: "development",
				MONGO_URI: `mongodb://localhost:27017/server-prod`,
				STRIPE_PUBLICABLE_KEY: "",
				STRIPE_PUBLICABLE_KEY: ``,
				FACEBOOK_APP_ID: ``,
				FACEBOOK_APP_SECRET: ``,
				SECRET_KEY: ``,
				FRONTEND_URL: ``,
				FRONTEND_DASHBOARD_URL: ``,
				ACCOUNTKIT_SECRET: ``,
				AWS_ACCESS_KEY_ID: ``,
				AWS_ACCESS_KEY_SECRET: ``
			}
		}
	]
};
