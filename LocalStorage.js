(function(global, define) {
define(function (require) {
	var when;

	when = require('when');

	function RestStore(namespace, options) {
		console.log("create" + namespace + options);
	}

	RestStore.prototype = {
		read: function() {
		},
		add: function(item) {
			console.log("add in store");
		},
		remove: function(item) {
			console.log("remove in store");
		},
		update: function(item) {
			console.log("update in store");
		},
	};

	return RestStore;

});
})(this.window || global,
	typeof define == 'function'
		? define
		: function(factory) { module.exports = factory(require); }
);
