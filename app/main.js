define({
    theme: { modules: [
        {module:'theme/topcoat-mobile-light.css'},
        {module:'theme/custom.css'}
    ]},
    controllerView: {
        render: {
            template: { module: 'text!app/controller/template.html' },
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
    todos: { create: 'cola/Collection' },
    todoSectionView: {
        render: {
            template: { module: 'text!app/todo/section.html' },
        },
        insert: { after: 'controllerView' },
        bind: {
            to: { $ref: 'todos' },
            bindings : {
                description: ".description"
            }
        }
    },
    todosForm: {
        element: { $ref: 'dom.first!form', at: 'todoSectionView' }
    },
    todoController: {
        create: 'app/todo/controller',
		properties: {
			model: { $ref: "todos"},
			store: { $ref: "todoStore"},
            _form: { $ref: "todosForm"},
			_updateForm: { $ref: 'form.setValues' }
		},
        on: {
            todoSectionView: {
                'click:.display': 'todos.edit',
                'click:.add': 'displayView',
                'click:.cancel': 'cancel',
                'click:.save': 'save | todos.update',
                'click:.delete': 'delete | todos.remove'
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
			module: '../AeroGearCore',
            properties: {
                "toto": "titi"
            }

		},
        bind: {
            to: { $ref: 'todos' }
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
