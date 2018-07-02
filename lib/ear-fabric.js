'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _modelAddBatcher = require('./model-add-batcher');

var _modelAddBatcher2 = _interopRequireDefault(_modelAddBatcher);

/**
 * When model have been added merge it into the big tree
 *
 * @param {Object} actions
 * @param {Backbone.Model} model
 */
function handleAdd(actions, model) {
  actions.add(model);
}

/**
 * When model have been changed merge it into the big tree
 *
 * @param {Object} actions
 * @param {Backbone.Model} model
 */
function handleChange(actions, model) {
  actions.merge(model);
}

/**
 * When model have been removed merge it into the big tree
 *
 * @param {Object} actions
 * @param {Backbone.Model} model
 */
function handleRemove(actions, model) {
  actions.remove(model);
}

/**
 * When collection have been reseted clear the tree and add colection's models into it
 *
 * @param {Object} actions
 * @param {Backbone.Collection} collection
 */
function handleReset(actions, collection) {
  actions.reset(collection.models);
}

/**
 * Imports all models on the initial load
 *
 * @param {Object} actions
 * @param {Backbone.Model[]} models
 */
function initialSync(actions, models) {
  actions.add(models);
}

/**
 * Binds actions and partially applies handler events to these actions
 *
 * @param {Object} rawActions
 * @return {Object}
 */
function createHandlersWithActions(rawActions, dispatch) {
  var actions = _redux.bindActionCreators(rawActions, dispatch);

  return {
    initialSync: initialSync.bind(this, actions),
    handleAdd: handleAdd.bind(this, actions),
    handleChange: handleChange.bind(this, actions),
    handleRemove: handleRemove.bind(this, actions),
    handleReset: handleReset.bind(this, actions)
  };
}

/**
 * The ear itself
 * Listens on any event from the collection and updates The Big Tree
 *
 * @param {Backbone.Collection} collection
 * @param {Object} rawActions object with functions. They are not action creators yet.
 * @param {Function} dispatch
 */

exports['default'] = function (collection, rawActions, dispatch) {
  var handlers = createHandlersWithActions(rawActions, dispatch);
  var modelAddBatcher = new _modelAddBatcher2['default']({ handle: handlers.handleAdd });

  handlers.initialSync(collection.models || collection);

  collection.on('add', function (model) {
    return modelAddBatcher.add(model);
  });
  collection.on('change', handlers.handleChange);
  collection.on('remove', handlers.handleRemove);
  collection.on('reset', handlers.handleReset);
};

module.exports = exports['default'];