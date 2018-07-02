'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.buildReducers = buildReducers;
exports.buildEars = buildEars;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionFabric = require('./action-fabric');

var _actionFabric2 = _interopRequireDefault(_actionFabric);

var _reducerFabric = require('./reducer-fabric');

var _reducerFabric2 = _interopRequireDefault(_reducerFabric);

var _earFabric = require('./ear-fabric');

var _earFabric2 = _interopRequireDefault(_earFabric);

function buildConstants(collectionName) {
  var uppercasedCollectionName = collectionName.toUpperCase();

  return {
    ADD: 'ADD_' + uppercasedCollectionName,
    REMOVE: 'REMOVE_' + uppercasedCollectionName,
    MERGE: 'MERGE_' + uppercasedCollectionName,
    RESET: 'RESET_' + uppercasedCollectionName
  };
}

function getIndex(indexesMap) {
  return indexesMap || { fields: { by_id: 'id' } };
}

function getSerializer(_ref) {
  var serializer = _ref.serializer;

  var defaultSerializer = function defaultSerializer(model) {
    return _extends({}, model.toJSON(), { __optimistic_id: model.cid });
  };
  return serializer || defaultSerializer;
}

function getCollection(collectionValue) {
  if (collectionValue.collection && !collectionValue.models){
    return collectionValue.collection;
  }
  return collectionValue;
}

function buildReducers(collectionsMap) {
  return Object.keys(collectionsMap).reduce(function (collector, collectionName) {
    var indexMap = getIndex(collectionsMap[collectionName].indexes_map);
    collector[collectionName] = _reducerFabric2['default'](buildConstants(collectionName), indexMap);
    return collector;
  }, {});
}

function buildEars(collectionsMap, _ref2) {
  var dispatch = _ref2.dispatch;

  Object.keys(collectionsMap).forEach(function (collectionName) {
    var serializer = getSerializer(collectionsMap[collectionName]);
    var rawActions = _actionFabric2['default'](buildConstants(collectionName), serializer);
    _earFabric2['default'](getCollection(collectionsMap[collectionName]), rawActions, dispatch);
  });
}

