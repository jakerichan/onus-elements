/**
 * Module dependencies
 */

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class')
var register = require('./registry').register;

var Set = createReactClass({
  propTypes: {
    prepend: PropTypes.bool,
    append: PropTypes.bool,
    name: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired
  },
  componentWillUnmount: function() {
    register(this.props.name, null, this.props.depth)
  },
  render: function () {
    var props = this.props;

    var location = props.prepend ?
      1 :
      props.append ?
        2 :
        0;

    register(props.name, props.children, props.depth, location);
    return null;
  }
});

exports = module.exports = Set;
exports['default'] = Set;
