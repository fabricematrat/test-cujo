(function(global, define) {
define(function (require) {
	var when, aerogear;

	when = require('when');
	aerogear = require('aerogear');

	function AeroGearCore(client, pipe) {
		
		this._rest = AeroGear.Pipeline({
			baseURL: client
		}).add(pipe).pipes[pipe];
		
		this._rest.read({
			success: function(data) {
				this._data = data;
			},
			error: function(error) {
			}
		});

		var dataManager = AeroGear.DataManager();
		dataManager.add(store);
		this._dataManager = dataManager.stores[store.name];

		if(store.type === "IndexedDB" || store.type === "WebSQL" ) {
			// TODO Is there something to do in fact ?
			this._dataManager.open({
				success: function(e) {
					console.log("DB is open" + e);
					var a =1;
				},
				error: function(e) {
					console.log("open is getting an exception" + e);
					var a =1;
				}
			});
		}

		var this = self;
		window.addEventListener('online',  function() {
			self._online = true;
			self._offlineAction.forEach(function(data, index){
				//self.patch(self._patches.splice(index, 1));
				//apply
			});
		});
		window.addEventListener('offline', function(){
			self._online = false;
		});
	}

	AeroGearCore.prototype = {
		forEach: function(lambda) {
			this._data.forEach(function(data) {
				lambda(data);
			});
		},
		add: function(item) {
			var deferred = when.defer();
			var self = this;
			if (this._online) {
				this._rest.save(item, {
					success: function(data) {
						self._dataManager.save(data);
					},
					error: function(error) {
					}
				});
			} else {
				this._offlineAction.push({action: 'add', item: data});
			}
		},
		remove: function(item) {
			var self = this;
			if (this._online) {
				this._rest.remove(item, {
					success: function(data) {
						self._dataManager.remove(data);
					},
					error: function(error) {
					}
				});
			} else {
				this._offlineAction.push({action: 'remove', item: data});
			}
		},
		update: function(item) {
			this.add(item);
		},
	};

	return AeroGearCore;

});
})(this.window || global,
	typeof define == 'function'
		? define
		: function(factory) { module.exports = factory(require); }
);
