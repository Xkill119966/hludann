const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth");
const donorCtrl = require('../../controllers/donation');
router.post(`/create`, authMiddleware, donorCtrl.createDonation);
router.post(`/create/clothes`, authMiddleware, donorCtrl.createClothes)
module.exports = router;
