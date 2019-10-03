const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travellerSchema = new Schema(
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

const Traveller = mongoose.model("Traveller", travellerSchema);
module.exports = {
	Traveller
};
