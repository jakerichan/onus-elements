/**
 * Module dependencies
 */

var React = require('react');
var subscribe = require('./registry').subscribe;

var Get = React.createClass({
  componentDidMount: function() {
    this.subscription = subscribe(this.props.name, this.onChange);
  },
  getInitialState: function() {
    return {
      content: null
    };
  },
  onChange: function(content) {
    var self = this;
    // wrap in a set timeout so we don't get warnings about setting state
    // inside of a render function
    setTimeout(function() {
      self.setState({content: content});
    });
  },
  componentWillUnmount: function() {
    this.subscription();
  },
  render: function() {
    return this.state.content || false;
  }
});

exports = module.exports = Get;
exports['default'] = Get;