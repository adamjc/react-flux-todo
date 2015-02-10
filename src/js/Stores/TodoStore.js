var AppDispatcher = require('../Dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var todos = {};

/**
 * add - adds a todo item to the TodoStore.
 *
 * @param {todo} todo - a todo object
 */
var add = function(todo) {
    // Attempts to generate a unique number... not guaranteed!
    var id = Math.floor(Math.random() * new Date().getTime());

    todo.id = id;

    todos[id] = todo;
};

/**
 * remove - removes a todo item from the TodoStore
 *
 * @param {int} todoId - the key of the todo item to remove.
 */
var remove = function(todoId) {
    delete todos[todoId];
};

/**
 * removeCompleted - removes all completed todos from the TodoStore
 */
var removeCompleted = function () {
    for (var todo in todos) {
        if (todos[todo].complete) {
            delete todos[todo];
        }
    }
};

/**
 * update - updates a todo with new properties
 *
 * @param {todo} todo - the new todo to replace the old one.
 */
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
    switch (action.actionType) {
        case 'add':
            // Add a new todo item.
            add(action.todo);
            break;
        case 'update':
            // Update a todo item.
            update(action.todo);
            break;
        case 'remove':
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
