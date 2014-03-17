define({
    theme: { modules: [
        {module:'theme/topcoat-mobile-light.css'},
        {module:'theme/custom.css'}
    ]},
    controllerView: {
        render: {
            template: { module: 'text!app/controller/template.html' }
        },
        insert: { at: 'dom.first!body' }
    },
    controller: {
		on: {
            controllerView: {
                'click:.todo': 'display'
			}
		}
	},
    todos: {
		create: {
			module: 'cola/Collection'
			,
			args: { strategy: { create: '../fakeStrategy' } }
		}
	},
    todoSectionView: {
        render: {
            template: { module: 'text!app/todo/section.html' }
        },
        insert: { after: 'controllerView' },
        bind: {
            to: { $ref: 'todos' },
			identifier: '_clientId',
			comparator: '_clientId',
            bindings : {
				description: ".description",
				// For debugging
				_clientId: '.clientId',
				id: '.serverId'
            }
        }
    },
    todosForm: {
        element: { $ref: 'dom.first!form', at: 'todoSectionView' }
    },
    todoController: {
        create: 'app/todo/controller',
		properties: {
            _form: { $ref: "todosForm"},
			_updateForm: { $ref: 'form.setValues' }
		},
        on: {
            todoSectionView: {
                'click:.display': 'todos.edit',
                'click:.displayAdd': 'displayView',
                'click:.cancel': 'cancel',
                'click:.add': 'save | todos.add',
                'click:.update': 'save | todos.update',
                'click:.remove': 'save | todos.remove'
			},
			controllerView: {
                'click:.todo': 'display'
			}
		},
		connect :{
            'todos.onEdit': "display"
		}		
	},
    todoStore: {
		create: {
			module: '../FakeAdapter'
//			args: ['http://localhost:8080/mytodo/', 'todos', {type:'SessionLocal', settings :{storageType:'localStorage'}}]
		},
        bind: {
            to: { $ref: 'todos' },
			identifier: '_clientId'
        }
    },
	form: { module: 'cola/dom/form' },
	// Wire.js plugins
	$plugins: [
		{ module: 'wire/dom', classes: { init: 'loading' } },
        { module: 'wire/dom/render' }, { module: 'wire/on' },
        { module: 'wire/connect' }, { module: 'wire/aop' },
        { module: 'cola' }
	]
});
