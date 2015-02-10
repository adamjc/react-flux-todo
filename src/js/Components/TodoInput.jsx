var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value
        };
    },

    componentDidMount: function () {
        this.getDOMNode().focus();
    },

    render: function () {
        return (
            <input value={this.state.value}
                   autofocus="true"
                   onChange={this.handleInput}
                   onBlur={this.save}
                   onKeyDown={this.handleInput}
            />
        );
    },

    handleInput: function (e) {
        this.setState({value: e.target.value});

        if (e.keyCode === 13) {
            this.save();
        }
    },

    save: function () {
        var value = this.state.value !== '' ? this.state.value : this.props.value;

        this.props.onSave(value);
    }
});
