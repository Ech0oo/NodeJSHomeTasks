class Product {
    constructor(name) {
        this.moduleName = name || "Product module";
        console.log(this.moduleName);
    }
}

module.exports.Product = Product;