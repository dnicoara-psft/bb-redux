/*
 This fabric creates actions object skeleton for passed constants and serializer.
 Useful to create all actions for ear just in one line.
 */
"use strict";

exports.__esModule = true;
function serializeFabric(serializer, payload) {
  return [].concat(payload).map(serializer);
}

exports["default"] = function (_ref, serializer) {
  var ADD = _ref.ADD;
  var REMOVE = _ref.REMOVE;
  var MERGE = _ref.MERGE;
  var RESET = _ref.RESET;

  var serialize = serializeFabric.bind(this, serializer);

  return {
    add: function add(payload) {
      return {
        type: ADD,
        entities: serialize(payload)
      };
    },

    remove: function remove(payload) {
      return {
        type: REMOVE,
        entities: serialize(payload)
      };
    },

    merge: function merge(payload) {
      return {
        type: MERGE,
        entities: serialize(payload)
      };
    },

    reset: function reset(payload) {
      return {
        type: RESET,
        entities: serialize(payload)
      };
    }
  };
};

module.exports = exports["default"];