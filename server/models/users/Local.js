const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localSchema = new Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

const Local = mongoose.model("Local", localSchema);
module.exports = {
	Local
};
