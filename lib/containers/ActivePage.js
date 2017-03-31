'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = {
  get: _lodash.get
};

var ActivePage = function (_React$Component) {
  _inherits(ActivePage, _React$Component);

  function ActivePage(props) {
    _classCallCheck(this, ActivePage);

    return _possibleConstructorReturn(this, (ActivePage.__proto__ || Object.getPrototypeOf(ActivePage)).call(this, props));
  }

  _createClass(ActivePage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var query = this.props.location.query;
      var email = query.email;
      var activeCode = query.token;
      var redirect = function redirect() {
        _this2.context.router.push('/features');
      };
      this.props.activate(email, activeCode, redirect);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'You are redirecting now. Please wait for a few seconds'
      );
    }
  }]);

  return ActivePage;
}(_react2.default.Component);

ActivePage.contextTypes = {
  router: _react2.default.PropTypes.object
};


function mapDispatchToProps(dispatch) {
  return {
    activate: function activate(email, activeCode, redirect) {
      dispatch((0, _actions.activateUser)({ email: email, activeCode: activeCode }, redirect));
    }
  };
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ActivePage);