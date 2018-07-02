'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reducerTools = require('./reducer-tools');

function buildInitialState(_ref) {
  var _ref$fields = _ref.fields;
  var fields = _ref$fields === undefined ? {} : _ref$fields;
  var _ref$relations = _ref.relations;
  var relations = _ref$relations === undefined ? {} : _ref$relations;

  var initIndex = function initIndex(acc, index) {
    return acc[index] = {}, acc;
  };

  return _extends({
    entities: []
  }, Object.keys(fields).reduce(initIndex, {}), Object.keys(relations).reduce(initIndex, {}));
}

function buildIndexBuilder(_ref2) {
  var _ref2$fields = _ref2.fields;
  var fields = _ref2$fields === undefined ? {} : _ref2$fields;
  var _ref2$relations = _ref2.relations;
  var relations = _ref2$relations === undefined ? {} : _ref2$relations;

  return function (entities) {
    var fieldBuilder = function fieldBuilder(acc, indexName) {
      acc[indexName] = _reducerTools.buildIndex(entities, fields[indexName]);
      return acc;
    };

    var relationBuilder = function relationBuilder(acc, indexName) {
      acc[indexName] = _reducerTools.buildRelation(entities, relations[indexName]);
      return acc;
    };

    return _extends({}, Object.keys(fields).reduce(fieldBuilder, {}), Object.keys(relations).reduce(relationBuilder, {}));
  };
}

function collectIds(entity) {
  return [entity.id, entity.__optimistic_id];
}

exports['default'] = function (_ref3) {
  var ADD = _ref3.ADD;
  var REMOVE = _ref3.REMOVE;
  var MERGE = _ref3.MERGE;
  var RESET = _ref3.RESET;
  var indexMap = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var initialState = buildInitialState(indexMap);
  var indexBuilder = buildIndexBuilder(indexMap);

  return function (state, action) {
    if (state === undefined) state = initialState;

    var entities = undefined;
    var indexes = undefined;

    switch (action.type) {
      case ADD:
        entities = _reducerTools.addEntities(state.entities, action.entities);
        indexes = indexBuilder(entities);

        return _extends({}, state, { entities: entities }, indexes);

      case REMOVE:
        var idsToRemove = action.entities.map(collectIds);

        entities = _reducerTools.removeEntities(state.entities, idsToRemove);
        indexes = indexBuilder(entities);

        return _extends({}, state, { entities: entities }, indexes);

      case MERGE:
        var idsToReplace = action.entities.map(collectIds);

        entities = _reducerTools.removeEntities(state.entities, idsToReplace);
        entities = _reducerTools.addEntities(entities, action.entities);
        indexes = indexBuilder(entities);

        return _extends({}, state, { entities: entities }, indexes);

      case RESET:
        entities = _reducerTools.addEntities(_extends({}, initialState).entities, action.entities);
        indexes = indexBuilder(entities);

        return _extends({}, initialState, { entities: entities }, indexes);

      default:
        return state;
    }
  };
};

module.exports = exports['default'];