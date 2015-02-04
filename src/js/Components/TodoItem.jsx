var React = require('react');
var TodoInput = require('./TodoInput.jsx');
var AppDispatcher = require('../Dispatcher/AppDispatcher.js');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            isEditing: false
        }
    },

    handleInput: function (e) {
        this.setState({ text: e.target.value});

        if (e.keyCode === 13) {
            AppDispatcher.dispatch({
                eventName: 'update-todo',
                todo: {
                    id: this.props.data.id,
                    text: e.target.value,
                    complete: this.props.complete
                }
            });
        }
    },

    toggleComplete: function (e) {
        AppDispatcher.dispatch({
            eventName: 'update-todo',
            todo: {
                id: this.props.data.id,
                text: this.props.data.text,
                complete: e.target.checked
            }
        });
    },

    render: function () {
        var todo = this.props.data;

        var displayText;
        var className = "todo-item-text";

        if (this.state.isEditing) {
            displayText =
                <TodoInput className={className} onSave={this.onSave} value={todo.text} />;
        } else {
            className += todo.complete ? ' todo-item-text--complete' : '';

            displayText =
                <label className={className} onDoubleClick={this.onDoubleClick}>
                    {todo.text}
                </label>
        }

        return (
            <li className="todo-item" ref="todoInput" key={todo.id}>
                {displayText}

                <input type="checkbox"
                       onChange={this.toggleComplete}
                       checked={todo.complete} />

                   <button onClick={this.delete}>delete</button>
            </li>
        );
    },

    delete: function () {
        AppDispatcher.dispatch({
            eventName: 'delete-todo',
            todoId: this.props.data.id
        });
    },

    onDoubleClick: function (e) {
        this.setState({isEditing: true});
    },

    onSave: function (inputText) {
        AppDispatcher.dispatch({
            eventName: 'update-todo',
            todo: {
                id: this.props.data.id,
                text: inputText,
                complete: this.props.complete
            }
        });

        this.setState({isEditing: false});
    }
});
