/**
 * Module dependencies
 */

var React = require('react');
var PropTypes = require('prop-types');
var subscribe = require('./registry').subscribe;

class Get extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.subscription = subscribe(this.props.name, this.onChange);
  }

  componentWillUnmount() {
    this.cancelTimeout = true;
    this.subscription();
  }

  onChange(content) {
    var self = this;
    // wrap in a set timeout so we don't get warnings about setting state
    // inside of a render function
    setTimeout(() => {
      if (this.cancelTimeout) return;
      self.setState({ content });
    });
  }

  render() {
    var content = this.state.content;
    var length = content ? content.length : 0;
    if (length === 0) return null;
    if (length === 1 && !Array.isArray(content[0])) return content[0] || null;
    return React.createElement.apply(null, ['div', null].concat(content));
  }
}

Get.propTypes = {
  name: PropTypes.string.isRequired,
};

exports = module.exports = Get;
exports.default = Get;
