'use strict';
module.exports = (sequelize, DataTypes) => {
	var Users = sequelize.define('Users', {
		name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: Sequelize.STRING,
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		}
		}, {
			classMethods: {
				associate: function (models) {
					// associations can be defined here
				}
			}
		});
	return Users;
};