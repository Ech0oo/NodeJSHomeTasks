'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			modelId: Sequelize.INTEGER
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Products');
	}
};