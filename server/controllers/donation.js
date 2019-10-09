const { Donation } = require("../models/donations/Donation");
const { Clothing } = require("../models/donations/Clothing");

const createDonation = (req, res) => {
	const { donar_id, items, images } = req.body;

	const bag = {
		total: items.legth || 0,
		items,
		images
	};
	const newDonation = new Donation({
		"date.start": Date.now(),
		"involved.donor_id": donar_id,
		bag: bag
	});

	newDonation.save((err, donation) => {
		if (err) {
			res.status(500).send({
				errors: {
					name: "error in create donation"
				}
			});
		} else {
			res.status(200).send({
				donation: donation,
				succcess: true
			});
		}
	});
};
module.exports = {};
