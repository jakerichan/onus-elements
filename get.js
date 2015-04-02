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
    var content = this.state.content;
    var length = content.length;
    if (length === 0) return false;
    if (length === 1) return content[0] || false;
    return React.createElement.apply(null, ['div', null].concat(content));
  }
});

exports = module.exports = Get;
exports['default'] = Get;