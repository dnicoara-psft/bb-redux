'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashDefer = require('lodash.defer');

var _lodashDefer2 = _interopRequireDefault(_lodashDefer);

/**
 * This class is responsible of batching adds, so when a fetch happens, a
 * single ADD action is triggered, instead of once per model.
 */

var ModelAddBatcher = (function () {
  function ModelAddBatcher(_ref) {
    var handle = _ref.handle;

    _classCallCheck(this, ModelAddBatcher);

    this.models = [];
    this.handle = handle;
  }

  ModelAddBatcher.prototype.add = function add(model) {
    this.flushAfter();
    this.models.push(model);
  };

  ModelAddBatcher.prototype.flushAfter = function flushAfter() {
    var _this = this;

    if (this.models.length > 0) {
      return;
    }

    _lodashDefer2['default'](function () {
      return _this.flush();
    });
  };

  ModelAddBatcher.prototype.flush = function flush() {
    this.handle(this.models);
    this.models = [];
  };

  return ModelAddBatcher;
})();

exports['default'] = ModelAddBatcher;
module.exports = exports['default'];