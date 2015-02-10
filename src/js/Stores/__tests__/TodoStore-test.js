// Shamelessly taken from Facebook's Flux TodoMVC GitHub page:
// https://github.com/facebook/flux/blob/master/examples/flux-todomvc/js/stores/__tests__/TodoStore-test.js

jest.dontMock('../TodoStore');
jest.dontMock('object-assign');

describe('TodoStore', function () {
    var AppDispatcher;
    var TodoStore;
    var callback;

    /* mock actions */
    var actionTodoAdd = {
        actionType: 'add',
        todo: {
            text: 'foo',
            complete: false
        }
    };

    var actionTodoRemove = {
        actionType: 'remove',
        todoId: 'replace me in the test'
    };

    var actionTodoAddComplete = {
        actionType: 'add',
        todo: {
            text: 'foo',
            complete: true
        }
    };

    var actionTodoRemoveComplete = {
        actionType: 'remove-completed'
    };

    var actionTodoUpdate = {
        actionType: 'update',
        todo: {
            id: 'replace me in the test',
            text: 'bar',
            complete: true
        }
    };

    beforeEach(function () {
        AppDispatcher = require('../../Dispatcher/AppDispatcher');
        TodoStore = require('../TodoStore');

        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function () {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should initialize with no todo items', function () {
        var all = TodoStore.getAll();
        expect(all).toEqual({});
    });

    it('adds a todo item', function () {
        callback(actionTodoAdd);

        var all = TodoStore.getAll();
        var keys = Object.keys(all);
        expect(keys.length).toBe(1);
        expect(all[keys[0]].text).toEqual('foo');
    });

    it('removes a todo item', function () {
        callback(actionTodoAdd);

        var all = TodoStore.getAll();
        var keys = Object.keys(all);
        expect(keys.length).toBe(1);
        actionTodoRemove.todoId = keys[0];
        callback(actionTodoRemove);
        expect(all[keys[0]]).toBeUndefined();
    });

    it('removes all completed todo items', function () {
        callback(actionTodoAdd);
        callback(actionTodoAddComplete);
        callback(actionTodoAddComplete);

        var all = TodoStore.getAll();
        var keys = Object.keys(all);
        expect(keys.length).toBe(3);

        callback(actionTodoRemoveComplete);
        keys = Object.keys(all);
        expect(keys.length).toBe(1);
    });

    it('updates a todo item', function () {
        callback(actionTodoAdd);

        var all = TodoStore.getAll();
        var keys = Object.keys(all);

        expect(all[keys[0]].text).toEqual('foo');
        expect(all[keys[0]].complete).toEqual(false);

        var todoId = keys[0];

        actionTodoUpdate.todo.id = todoId;
        callback(actionTodoUpdate);

        keys = Object.keys(all);
        expect(all[keys[0]].text).toEqual('bar');
        expect(all[keys[0]].complete).toEqual(true);
    });
});
