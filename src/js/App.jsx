var React = require('react');
var Todo = require('./Components/Todo.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div className="App">
                <Todo />
            </div>
        );
    }
});

React.render(
    <App />,
    document.getElementById('main')
);
