const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Clothing } = require("./Clothing");
const donationSchema = new Schema(
	{
		process: {
			type: String,
			default: "OPEN",
			enum: ["COMPLETED", "OPEN", "ENROUTE", "FAILED"]
		},
		date: {
			start: {
				type: Date
			},
			end: {
				type: Date
			}
		},

		involved: {
			finished: {
				type: Boolean,
				default: false
			},
			local: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Local"
			},
			donor_id: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Donor"
			},
			traveller_id: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: "Traveller"
			}
		},

		bag: {
			total: {
				type: Number,
				default: 0
			},
			items: [
				{
					type: mongoose.SchemaTypes.ObjectId,
					ref: "Clothing"
				}
			],
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
		}
	},
	{
		timestamps: true
	}
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = {
	Donation
};
