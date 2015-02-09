var AppDispatcher = require('../Dispatcher/AppDispatcher.js');

var TodoActions = {
    add: function(todo) {
        AppDispatcher.dispatch({
            eventName: 'add-todo',
            todo: todo
        });
    },

    update: function(todo) {
        AppDispatcher.dispatch({
            eventName: 'update-todo',
            todo: todo
        });
    },

    remove: function(todoId) {
        AppDispatcher.dispatch({
            eventName: 'remove-todo',
            todoId: todoId
        });
    },

    removeCompleted: function() {
        AppDispatcher.dispatch({
            eventName: 'remove-completed'
        });
    }
};

module.exports = TodoActions;
