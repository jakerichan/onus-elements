/**
 * Module dependencies
 */

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class')
var subscribe = require('./registry').subscribe;

var Get = createReactClass({
  propTypes: {
    name: PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {content: null}
  },
  componentDidMount: function () {
    this.subscription = subscribe(this.props.name, this.onChange);
  },
  componentWillUnmount: function () {
    this.cancelTimeout = true;
    this.subscription();
  },
  onChange: function (newContent) {
    var self = this;
    // wrap in a set timeout so we don't get warnings about setting state
    // inside of a render function
    setTimeout(() => {
      if (this.cancelTimeout) return;
      self.setState({ content: newContent });
    });
  },
  render: function () {
    var content = this.state.content;
    var length = content ? content.length : 0;
    if (length === 0) return null;
    if (length === 1 && !Array.isArray(content[0])) return content[0] || null;
    return React.createElement.apply(null, ['div', null].concat(content));
  }
});

exports = module.exports = Get;
exports.default = Get;
