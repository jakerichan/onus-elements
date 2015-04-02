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

    var location = props.prepend ?
      1 :
      props.append ?
        2 :
        0;

    register(props.name, props.children, props.depth, location);
    return false;
  }
});

exports = module.exports = Set;
exports['default'] = Set;