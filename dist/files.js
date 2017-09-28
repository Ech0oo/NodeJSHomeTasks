"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Files = function () {
    function Files(name, extension, size, changed) {
        _classCallCheck(this, Files);

        this.moduleName = "Files module";
        console.log(this.moduleName);
    }

    _createClass(Files, [{
        key: "scanDir",
        value: function scanDir(path) {
            console.log("Scanning directory.. ", path);
            var that = this;
            var fileList = {};
            return new Promise(function (resolve, reject) {
                _fs2.default.readdir(path, function (err, files) {
                    console.log("Files in the folder: \n", files);
                    if (err) reject(err);
                    if (files.length) {
                        for (var i = 0; i < files.length; i++) {
                            var fullPath = path + "\\" + files[i];
                            var itemStat = _fs2.default.statSync(fullPath);
                            fileList[files[i]] = {
                                "fileName": files[i],
                                "fileSize": itemStat.size,
                                "fileChanged": itemStat.mtime
                            };
                        }
                        resolve(fileList);
                    }
                });
            });
        }
    }, {
        key: "compareLists",
        value: function compareLists(prevList, newList) {
            console.log("Compare lists.. ");
            var that = this;
            var changedFileList = []; // names of files that was changed
            for (var fileName in newList) {
                if (newList.hasOwnProperty(fileName)) {
                    if (prevList[fileName]) {
                        var newElement = newList[fileName];
                        var _prevList = prevList[fileName];
                        console.log("prev element ", _prevList);
                        console.log("new element ", newElement);
                        if (JSON.stringify(newElement) !== JSON.stringify(_prevList)) {
                            that.changedFileList.push(fileName);
                        };
                    } else {
                        // that.emit("File " + fileName + " was deleted.");
                    }
                }
            }
            return changedFileList;
        }
    }]);

    return Files;
}();

module.exports.Files = Files;