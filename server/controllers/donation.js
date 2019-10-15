const { Donation } = require("../models/donations/Donation");
const { Clothing } = require("../models/donations/Clothing");

const createDonation = (req, res) => {
	const { donar_id, items, images } = req.body;

	const bag = {
		total: items.length || 0,
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



const getDonationByProcess = (req, res) => {
	let { type } = req.query.type;

	let donationType;

	switch (type) {
		case 'ENROUTE':
			donationType = type
			break;
		case 'ALL':
			donationType = type
			break;
		case 'FAILED':
			donationType = type
			break;
		case 'OPEN':
			donationType = type
			break;
		case 'COMPLETED':	
		 	donationType = type
		 	break;
		default:
			break;
	}
	Donation.find({ 'process.type': donationType })
		.populate({ path: 'bag.items.cloth_id' })
		.exec(function (err, docs) {
			if (err) {
				res.status(500).send({
					success: false
				})
			} else {
				

				res.status(200).send({
					donations: docs,
					success: true
				});
			}
		});



}

const createClothes = (req, res) => {
	let { category, type, qty } = req.body;
	const newClothes = new Clothing({
		category: category,
		type: type,
		qty: qty
	})

	newClothes.save((err, clothes) => {
		if (err) {
			res.status(500).send({
				errors: {
					errors: "error in create donation"
				}
			});
		} else {
			res.status(200).send({
				clothes: clothes,
				succcess: true
			});
		}
	})
}

module.exports = {
	createDonation,
	createClothes,
	getDonationByProcess
};
