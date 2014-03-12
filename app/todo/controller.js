(function (define) {
define(function (require, exports, module) {

	module.exports = TodosController;

	var csst = require('csst');
	var slice = Array.prototype.slice;
	var update = csst.lift(csst.toggle('hidden'));
	var state = false;

	function TodosController() {
	}

	TodosController.prototype.load = function() {
		console.log("load all todos" + this.model);
		// using the store !!!
		// instead of that !!!
		this.model.add({id: '1',description: "titi", complete: false});
		this.model.add({id: '2', description: "titi2", complete: false});
		this.model.add({id: '3', description: "titi3", complete: true});
		this.model.add({id: '4', description: "titi4", complete: true});
	};
	
	TodosController.prototype.displayView = function() {
		document.querySelector('.todo-display').reset();
		changeView('.todo-display');
	};

	TodosController.prototype.display = function(todo) {
		this.displayView();
		if (todo != null) {
			this._updateForm(document.querySelector('.todo-display'), todo);
		}
		console.log("in todos display" + todo);
	};

	TodosController.prototype.save = function(todo) {
		changeView('.todos-list');
	};

	TodosController.prototype.delete = function(todo) {
		changeView('.todos-list');
	};

	TodosController.prototype.cancel = function(todos, todo) {
		changeView('.todos-list');
	};

	function changeView(view) {
		var buttonsElement = document.querySelectorAll('.todos-element');
		var buttonsList = document.querySelectorAll('.todos-list');
		slice.call(buttonsElement, 0).forEach(function(node){
			update(state, node);
		});
		slice.call(buttonsList, 0).forEach(function(node){
			update(!state, node);
		});
		slice.call(document.querySelectorAll('section.todos-section section:not(.hidden),form:not(.hidden)'), 0).forEach(function(node) {
			update(true, node);
		});
		update(false, document.querySelector(view));
		state = !state;
	}
})
}(
	typeof define == 'function' && define.amd
		? define
		: function (factory) { module.exports = factory(require, exports, module); }
));

