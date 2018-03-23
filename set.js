/**
 * Module dependencies
 */

var React = require('react');
var PropTypes = require('prop-types');
var register = require('./registry').register;

class Set extends React.Component {
  componentWillUnmount() {
    register(this.props.name, null, this.props.depth)
  }

  render() {
    var props = this.props;

    var location = props.prepend ?
      1 :
      props.append ?
        2 :
        0;

    register(props.name, props.children, props.depth, location);
    return null;
  }
}

Set.propTypes = {
  prepend: PropTypes.bool,
  append: PropTypes.bool,
  name: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired
};

exports = module.exports = Set;
exports['default'] = Set;
