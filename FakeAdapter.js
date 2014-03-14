/** MIT License (c) copyright B Cavalier & J Hann */

(function(define) {	'use strict';
define(function (require) {

	var when = require('when');

	function FakeAdapter() {
		this._rest = new FakeRest();
	}

	FakeAdapter.prototype = {

		provide: true,

		getOptions: function() {
			return {};
		},

		forEach: function(f) {
			return this._rest.read().then(function(data) {
				Object.keys(data).forEach(function(k) {
					f(data[k]);
				});
			});
		},

		add: function(item) {
			var self = this;
			return this._rest.save(item).then(function(data) {
				item.id = data.id;
				return self.notifyUpdate(item);
			});
		},

		remove: function(item) {
			return this._rest.remove(item);
		},

		update: function(item) {
			if(this._notifying()) {
				return this._finishNotify(item);
			}

			return this._rest.save(item);
		},

		clear: function() {
			return this._rest.removeAll();
		},

		notifyUpdate: function(item) {
			this._isNotifying = true;
			return this.update(item);
		},

		_notifying: function() {
			return this._isNotifying;
		},

		_finishNotify: function(item) {
			this._isNotifying = false;
			return when.resolve(item);
		}
	};

	function FakeRest() {
		this.data = {};
		this._id = 0;
	}

	FakeRest.prototype.read = function() {
		return when.resolve(copy(this.data));
	};

	FakeRest.prototype.save = function(item) {
		var id = item.id ? item.id : ++this._id;
		item = copy(item);
		item.id = id;
		this.data[id] = item;

		return when.resolve(copy(item));
	};

	FakeRest.prototype.remove = function(item) {
		delete this.data[item.id];
		return when.resolve();
	};

	FakeRest.prototype.removeAll = function() {
		this.data = {};
		return when.resolve();
	};

	function copy(obj) {
		return Object.keys(obj).reduce(function(o, k) {
			o[k] = obj[k];
			return o;
		}, {});
	}

	return FakeAdapter;

});
})(typeof define == 'function' ? define : function(factory) { module.exports = factory(require); } );
