(function (define) { 'use strict';
define(function (require) {

	var compose = require('cola/network/strategy/compose');
	var targetFirstItem = require('cola/network/strategy/targetFirstItem');
	var syncAfterJoin = require('cola/network/strategy/syncAfterJoin');
	var syncDataDirectly = require('cola/network/strategy/syncDataDirectly');
	var collectThenDeliver = require('cola/network/strategy/collectThenDeliver');
	var validate = require('cola/network/strategy/validate');
	var changeEvent = require('cola/network/strategy/changeEvent');

	return function (options) {

		var strategies = [
			validate(options),
			collectThenDeliver(options),
			changeEvent(options),
			syncAfterJoin(options),
			syncDataDirectly(options)
		];

		if(options && options.targetFirstItem) {
			strategies.push(targetFirstItem(options));
		}

		strategies.push(baseWithClientIds());

		return compose(strategies);
	};

	function baseWithClientIds () {

		var clientId = 0;

		return function handleClientIds (source, dest, data, type, api) {
			addClientIdIfNecessary(api, type, data);
			if (api.isPropagating() && type in dest) {
				if (api.isHandled()) return;
				if (typeof dest[type] != 'function') {
					throw new Error('baseStrategy: ' + type + ' is not a function.');
				}
				return dest.origSource && dest.origSource !== source ? dest[type](data) : data;
			}
		};

		function addClientIdIfNecessary(api, type, data) {
			if (api.isBefore()
				&& (type === 'updated' || type === 'add')
				&& !('_clientId' in data)) {
				data._clientId = ++clientId;
			}
		}

	}

});
}(typeof define == 'function' && define.amd ? define : function (factory) { module.exports = factory(require); } ));
