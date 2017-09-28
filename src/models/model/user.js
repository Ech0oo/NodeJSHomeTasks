class User {
    constructor(name) {
        this.moduleName = name || "User module";
        console.log(this.moduleName);
    }
}

module.exports.User = User;