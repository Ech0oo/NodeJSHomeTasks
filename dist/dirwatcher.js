'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _events = require('events');

var _files = require('./files');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirWatcher = function (_EventEmitter) {
    _inherits(DirWatcher, _EventEmitter);

    function DirWatcher() {
        _classCallCheck(this, DirWatcher);

        var _this = _possibleConstructorReturn(this, (DirWatcher.__proto__ || Object.getPrototypeOf(DirWatcher)).call(this));

        _this.moduleName = "DirWatcher";
        console.log(_this.moduleName);
        _this.filesList = null;
        _this.changedFilesList = [];
        return _this;
    }

    _createClass(DirWatcher, [{
        key: 'watch',
        value: function watch() {
            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\data";
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;

            var that = this;
            var fullPath = __dirname + "\\" + path;
            var files = new _files.Files();
            setInterval(function () {
                // scan dir
                files.scanDir(fullPath).then(function (newList) {
                    console.log("List of files was received");
                    // get list of changed files
                    if (that.filesList) {
                        console.log("list!!!");
                        that.changedFilesList = files.compareLists(that.filesList, newList);
                        console.log("Changes list============================ ", that.changedFilesList);
                    }
                    if (that.changedFilesList.length) {
                        console.log("Were changes!!!");
                        that.emit("fileChange");
                    } else {
                        console.log("No changes!");
                    }
                    that.filesList = newList;
                });
            }, delay);

            // implement function
            console.log("path: ", path);
            console.log("delay: ", delay);
            console.log("dirname: ", __dirname);
            console.log("fullPath: ", fullPath);
        }
    }]);

    return DirWatcher;
}(_events.EventEmitter);

module.exports.DirWatcher = DirWatcher;