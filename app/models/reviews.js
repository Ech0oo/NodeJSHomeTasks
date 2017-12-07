'use strict';
module.exports = (sequelize, DataTypes) => {
	var Reviews = sequelize.define('Reviews', {
		review: Sequelize.TEXT
	}, {
			classMethods: {
				associate: function (models) {
					// associations can be defined here
				}
			}
		});
	return Reviews;
};