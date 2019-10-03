const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothingSchema = new Schema(
	{
		category: {
			type: String,
			enum: ["WOMEN", "MEN", "CHILDREN"]
		},
		type: {
			type: String,
			enum: ["SHIRT", "PANT", "HAT", "SHORT", "SHOE", "SKIRT", "TROUSER"]
		},
		images: [
			{
				url: {
					type: String
				},
				id: {
					type: String
				}
			}
		]
	},
	{
		timestamps: true
	}
);

const Clothing = mongoose.model("Clothing", clothingSchema);
module.exports = {
	Clothing,
	clothingSchema
};
