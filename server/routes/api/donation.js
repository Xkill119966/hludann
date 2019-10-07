const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth");

router.post(`/create`, authMiddleware);
module.exports = router;
