"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Publisher = function () {
    function Publisher(data) {
        _classCallCheck(this, Publisher);

        this.moduleName = "Publisher module";
        console.log(this.moduleName);

        this.subscribers = [];
    }

    _createClass(Publisher, [{
        key: "fireEvent",
        value: function fireEvent() {
            this.subscribers.forEach(function (fn) {
                fn(data);
            });

            return this;
        }
    }, {
        key: "subscribe",
        value: function subscribe(observer) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.subscribers.push({ observer: observer, context: context });
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(type, fn, context) {
            var i = 0;
            while (i < this.subscribers.length) {
                if (this.subscribers[i].observer === observer && this.subscribers[i].context === context) {
                    this.subscribers = this.subscribers.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    }]);

    return Publisher;
}();

module.exports.Publisher = Publisher;