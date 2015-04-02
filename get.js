/**
 * Module dependencies
 */

var React = require('react');
var subscribe = require('./registry').subscribe;

var Get = React.createClass({
  componentWillMount: function() {
    this.subscription = subscribe(this.props.name, this.onChange);
  },
  onChange: function(content) {
    this.setState({content: content});
  },
  componentWillUnmount: function() {
    this.subscription();
  },
  render: function() {
    return this.state.content;
  }
});

exports = module.exports = Get;
exports['default'] = Get;