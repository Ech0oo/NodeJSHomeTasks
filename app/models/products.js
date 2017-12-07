'use strict';
module.exports = (sequelize, DataTypes) => {
	var Products = sequelize.define('Products', {
		name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		modelId: Sequelize.INTEGER,
		},{
			classMethods: {
				associate: function (models) {
					// associations can be defined here
				}
			}
		});
	return Products;
};