'use strict';

exports.__esModule = true;
exports.buildIndex = buildIndex;
exports.buildRelation = buildRelation;
exports.addEntities = addEntities;
exports.removeEntities = removeEntities;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashGroupby = require('lodash.groupby');

var _lodashGroupby2 = _interopRequireDefault(_lodashGroupby);

var _lodashCompact = require('lodash.compact');

var _lodashCompact2 = _interopRequireDefault(_lodashCompact);

var _lodashFlatten = require('lodash.flatten');

var _lodashFlatten2 = _interopRequireDefault(_lodashFlatten);

function buildIndex(entities, field) {
  return entities.reduce(function (acc, entity) {
    return acc[entity[field]] = entity, acc;
  }, {});
}

function buildRelation(entities, field) {
  return _lodashGroupby2['default'](entities, field);
}

function addEntities(currentEntities, newEntities) {
  return [].concat(currentEntities, newEntities);
}

function removeEntities(currentEntities, idsToRemove) {
  var ids = _lodashCompact2['default'](_lodashFlatten2['default'](idsToRemove));
  return currentEntities.filter(function (entity) {
    return ids.indexOf(entity.id) < 0 && ids.indexOf(entity.__optimistic_id) < 0;
  });
}