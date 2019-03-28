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
    priority: PropTypes.number.isRequired
  },
  componentWillUnmount: function() {
    register(this.props.name, null, this.props.priority);
  },
  render: function () {
    var props = this.props;

    var location = props.prepend ?
      1 :
      props.append ?
        2 :
        0;

    setTimeout(function () {
      // this lets the previous SetElement at the same priority unregister before rendering the next
      register(props.name, props.children, props.priority, location);
    });
    return null;
  }
});

exports = module.exports = Set;
exports['default'] = Set;
