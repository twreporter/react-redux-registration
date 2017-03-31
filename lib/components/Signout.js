'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _actions = require('../actions');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = {
  get: _lodash.get
};

var Signout = function (_React$Component) {
  _inherits(Signout, _React$Component);

  function Signout() {
    _classCallCheck(this, Signout);

    return _possibleConstructorReturn(this, (Signout.__proto__ || Object.getPrototypeOf(Signout)).apply(this, arguments));
  }

  _createClass(Signout, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.signout();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'You are now logged out of The Reporter, please sign in again'
        ),
        _react2.default.createElement(
          'a',
          { href: 'http://testtest.twreporter.org/:3000/signin' },
          'signin'
        )
      );
    }
  }]);

  return Signout;
}(_react2.default.Component);

function mapDispatchToProps(dispatch) {
  return {
    signout: function signout() {
      dispatch((0, _actions.signoutUser)());
    }
  };
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Signout);