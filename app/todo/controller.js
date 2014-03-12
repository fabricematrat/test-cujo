(function (define) {
define(function (require, exports, module) {

	module.exports = TodosController;

	var csst = require('csst');
	var form = require('cola/dom/form');
	var slice = Array.prototype.slice;
	var update = csst.lift(csst.toggle('hidden'));
	var state = false;

	function TodosController() {
	}

	TodosController.prototype.displayView = function() {
		this._form.reset();
		changeView('.todo-display');
	};

	TodosController.prototype.display = function(todo) {
		this.displayView();
		if (todo != null) {
			this._updateForm(this._form, todo);
		}
	};

	TodosController.prototype.save = TodosController.prototype.delete = function() {
		var todo = form.getValues(this._form);
		changeView('.todos-list');
		return todo;
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

