var AppDispatcher = require('../Dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var todos = {};

var add = function(todo) {
    var id = new Date().getTime();

    todo.id = id;

    todos[id] = todo;
};

var remove = function(todoId) {
    delete todos[todoId];
};

var removeCompleted = function () {
    for (var todo in todos) {
        if (todos[todo].complete) {
            delete todos[todo];
        }
    }
};

var update = function(todo) {
    todos[todo.id] = todo;
};

var TodoStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAll: function () {
        return todos;
    }
});

AppDispatcher.register(function (action) {
    switch (action.eventName) {
        case 'add-todo':
            // Add a new todo item.
            add(action.todo);
            break;
        case 'update-todo':
            // Update a todo item.
            update(action.todo);
            break;
        case 'remove-todo':
            // Delete a todo item.
            remove(action.todoId);
            break;
        case 'remove-completed':
            // Delete all todo items
            removeCompleted();
            break;
    }

    TodoStore.emitChange();
    return true;
});

module.exports = TodoStore;
