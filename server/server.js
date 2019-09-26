const express = require("express");
const http = require("http");
const config = require("./config");
// *** express server initialization ***
const app = express();

// getting  third party  and api middlewares and routes
require("./routes/index")(app);
require("./routes/db")();

app.listen(5006, () => {
	console.log("Hlu Dann Server Running at 5006");
});
