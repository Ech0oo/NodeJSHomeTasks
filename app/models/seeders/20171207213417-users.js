var users = require('../users.json');

module.exports = {
	up: (queryInterface, Sequelize) => {
		users.forEach((user) => {
			user.createdAt = new Date();
			user.updatedAt = new Date();
		});
		return queryInterface.bulkInsert('Users', users, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
