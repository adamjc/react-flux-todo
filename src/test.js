var AppDispatcher = new Flux.Dispatcher();

var TodoStore = {
    todos: [],

    getAll: function () {
        return this.todos;
    }
}

MicroEvent.mixin(TodoStore);

AppDispatcher.register(function (data) {
    switch (data.eventName) {
        case 'new-todo':
            TodoStore.todos.push(data.newTodo);
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
})
