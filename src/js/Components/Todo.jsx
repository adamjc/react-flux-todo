var React = require('react');
var TodoStore = require('../Stores/TodoStore.js');
var TodoItem = require('./TodoItem.jsx');
var AppDispatcher = require('../Dispatcher/AppDispatcher.js');
var TodoActions = require('../Actions/TodoActions.js');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            placeholder: 'Enter Todo...',
            todos: TodoStore.getAll()
        };
    },

    componentDidMount: function () {
        TodoStore.addChangeListener(this.onChange);
    },

    onChange: function () {
        this.setState({todos: TodoStore.getAll()});
    },

    addTodo: function (e) {
        if (this.state.text) {
            var todo = {
                text: this.state.text,
                complete: false
            };

            TodoActions.add(todo);
        }
    },

    removeCompletedTodos: function (e) {
        TodoActions.removeCompleted();
    },

    handleInput: function (e) {
        this.setState({ text: e.target.value });

        if (e.keyCode === 13) {
            this.addTodo();
            this.setState({ text: '' });
        }
    },

    render: function () {
        var text = this.state.text
        var todoList = [];
        var todos = TodoStore.getAll();

        for (var todo in TodoStore.getAll()) {
            todoList.push(<TodoItem key={todo} data ={todos[todo]} />);
        }

        return (
            <div>
                <input onChange={this.handleInput}
                       onKeyDown={this.handleInput}
                       value={text}
                       placeholder={this.state.placeholder} />

                <button onClick={this.addTodo}>New Item</button>

                <button onClick={this.removeCompletedTodos}>Delete Completed Todos</button>

                <ul>
                    {todoList}
                </ul>
            </div>
        );
    }
});
