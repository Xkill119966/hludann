const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travellerSchema = new Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User"
		},
		reward: {
			total: {
				type: Number,
				default: 0
			},
			locals: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Local" }]
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

const Traveller = mongoose.model("Traveller", travellerSchema);
module.exports = {
	Traveller
};
