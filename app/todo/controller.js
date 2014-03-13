(function (define) {
define(function (require, exports, module) {

	module.exports = TodosController;

	var csst = require('csst');
	var form = require('cola/dom/form');
	var slice = Array.prototype.slice;
	var update = csst.lift(csst.toggle('hidden'));
	var state = false;
	var stateAdd = false;
	var stateUpdate = false;

	function TodosController() {
	}

	TodosController.prototype.displayView = function() {
		this._form.reset();
		changeView('.todo-display', 'add');
	};

	TodosController.prototype.display = function(todo) {
		this._form.reset();
		this._updateForm(this._form, todo);
		changeView('.todo-display', 'update');
	};

	TodosController.prototype.save = TodosController.prototype.delete = function() {
		var todo = form.getValues(this._form);
		todo.id = parseInt(todo.id);
		changeView('.todos-list', 'list');
		return todo;
	};

	TodosController.prototype.cancel = function(todos, todo) {
		changeView('.todos-list', 'list');
	};

	function changeView(view, action) {
		var buttonsElement = document.querySelectorAll('.todos-element');
		var buttonsElementUpdate = document.querySelectorAll('.todos-element-update');
		var buttonsElementAdd = document.querySelectorAll('.todos-element-add');
		var buttonsList = document.querySelectorAll('.todos-list');
		slice.call(buttonsElement, 0).forEach(function(node){
			update(state, node);
		});
		if(action === 'update' || (action === 'list' && stateUpdate) ) {
			slice.call(buttonsElementUpdate, 0).forEach(function(node){
				update(stateUpdate, node);
			});
			stateUpdate = !stateUpdate;
		}
		if(action === 'add' || (action === 'list' && stateAdd)) {
			slice.call(buttonsElementAdd, 0).forEach(function(node){
				update(stateAdd, node);
			});
			stateAdd = !stateAdd;
		}
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

