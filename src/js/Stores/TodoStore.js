var AppDispatcher = require('../Dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var TodoStore = assign({}, EventEmitter.prototype, {
    todos: {},

    update: function(todo) {
        this.todos[todo.id] = todo;
    },

    delete: function(todoId) {
        delete this.todos[todoId];
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    add: function(todo) {
        var id = new Date().getTime();

        todo.id = id;

        this.todos[id] = todo;
    },

    getAll: function () {
        return this.todos;
    }
});

AppDispatcher.register(function (action) {
    switch (action.eventName) {
        case 'new-todo':
            // Add a new todo item.
            TodoStore.add(action.todo);
            TodoStore.emitChange();
            break;
        case 'update-todo':
            // Update a todo item.
            TodoStore.update(action.todo);
            TodoStore.emitChange();
            break;
        case 'delete-todo':
            TodoStore.delete(action.todoId);
            TodoStore.emitChange();
            break;
        case 'remove-all-todos':
            break;
    }

    return true;
});

module.exports = TodoStore;
