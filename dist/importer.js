"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Importer = function () {
    function Importer(name) {
        _classCallCheck(this, Importer);

        this.moduleName = "Importer module";
        console.log(this.moduleName);
    }

    _createClass(Importer, [{
        key: "onFileChange",
        value: function onFileChange(data) {
            console.log("Importer reaction on change: ", data);
        }
    }, {
        key: "import",
        value: function _import(path) {
            return new Promise(function (resolve, reject) {
                // data
            });
        }
    }, {
        key: "importSync",
        value: function importSync(path) {
            // all data
        }
    }]);

    return Importer;
}();

module.exports.Importer = Importer;