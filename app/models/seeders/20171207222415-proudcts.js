var products = require('../products.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    products.forEach((product) => {
      product.createdAt = new Date();
      product.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
