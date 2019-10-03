const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User"
		},
		donations: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Donation"
			}
		]
	},
	{
		timestamps: true
	}
);

const Donor = mongoose.model("Donor", donorSchema);
module.exports = {
	Donor
};
