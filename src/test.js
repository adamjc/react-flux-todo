var AppDispatcher = new Flux.Dispatcher();

var TodoStore = {
    todos: [],

    updateTodo: function(todo) {
        this.todos.splice(todo.id, 1, todo);

        console.log(todo);
    },

    getAll: function () {
        return this.todos;
    }
};

MicroEvent.mixin(TodoStore);

AppDispatcher.register(function (data) {
    switch (data.eventName) {
        case 'new-todo':
            TodoStore.todos.push(data.newTodo);
            TodoStore.trigger('change');
            break;
        case 'update-todo':
            TodoStore.updateTodo(data.todo);
            TodoStore.trigger('change');
            break;
        case 'remove-todo':
            // Remove the todo item.
            break;
        case 'remove-all-todos':
            // Remove all todo items
            break;
    }

    return true;
});
