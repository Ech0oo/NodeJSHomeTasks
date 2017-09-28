"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function Product(name) {
    _classCallCheck(this, Product);

    this.moduleName = name || "Product module";
    console.log(this.moduleName);
};

module.exports.Product = Product;