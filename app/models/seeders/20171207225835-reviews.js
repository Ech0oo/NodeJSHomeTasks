var reviews = require('../reviews.json');

module.exports = {
	up: (queryInterface, Sequelize) => {
		reviews.forEach((review) => {
			review.createdAt = new Date();
			review.updatedAt = new Date();
		});
		return queryInterface.bulkInsert('Reviews', reviews, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Reviews', null, {});
	}
};
