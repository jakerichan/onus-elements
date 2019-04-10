var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class')
var register = require('./registry').register;

var Set = createReactClass({
  propTypes: {
    prepend: PropTypes.bool,
    append: PropTypes.bool,
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    withProps: PropTypes.object
  },
  componentWillUnmount: function() {
    register(Object.assign({}, this.props, { children: null, withProps: null }));
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
      register(props, location);
    });
    return null;
  }
});

exports = module.exports = Set;
exports['default'] = Set;
