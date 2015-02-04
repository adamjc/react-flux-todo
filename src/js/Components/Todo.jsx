var React = require('react');
var TodoStore = require('../Stores/TodoStore.js');
var TodoItem = require('./TodoItem.jsx');
var AppDispatcher = require('../Dispatcher/AppDispatcher.js');

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
        this.setState({text: ''});

        if (this.state.text) {
            AppDispatcher.dispatch({
                eventName: 'new-todo',
                todo: {
                    text: this.state.text,
                    complete: false
                }
            });
        }
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

                <ul>
                    {todoList}
                </ul>
            </div>
        );
    }
});
