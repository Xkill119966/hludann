const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema(
	{},
	{
		timestamps: true
	}
);

const Donation = mongoose.model("Donation", donorSchema);
module.exports = {
	Donation
};
