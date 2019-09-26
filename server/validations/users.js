const Validator = require("validator");
const { isEmpty } = require("../utils/utils");

const userSignInValidation = data => {
	let errors = {};

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
const userSignUpValidation = data => {
	let errors = {};

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = {
	userSignInValidation,
	userSignUpValidation
};
