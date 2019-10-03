const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User"
		},
		location: {
			type: {
				type: String,
				enum: ["Point"],
				required: true
			},
			coordinates: {
				type: [Number],
				required: true
			}
		},
		address: {
			line1: {
				type: String
			},
			township: {
				type: String
			},
			region: {
				type: String
			}
		}
	},
	{
		timestamps: true
	}
);

const Donor = mongoose.model("Donor", donorSchema);
module.exports = {
	Donor
};
