/**
 * Module dependencies
 */

var React = require('react');
var register = require('./registry').register;

var Set = React.createClass({
  componentWillReceiveProps: function(next) {
    // TODO unregister old names/depths
  },
  componentWillUnmount: function() {
    register(this.props.name, null, this.props.depth);
  },
  render: function() {
    var props = this.props;
    register(props.name, props.children, props.depth);
    return false;
  }
});

exports = module.exports = Set;
exports['default'] = Set;