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

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = {
  get: _lodash.get
};

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  _createClass(Signup, null, [{
    key: 'fetchData',
    value: function fetchData() {
      return new Promise(function (resolve) {
        resolve();
      });
    }
  }]);

  function Signup(props) {
    var _this$state;

    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.EMAIL, ""), _defineProperty(_this$state, _constants.PASSWORD, ""), _defineProperty(_this$state, _constants.CONFIRM, ""), _defineProperty(_this$state, 'validationError', ""), _this$state);
    return _this;
  }

  _createClass(Signup, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var target = e.target;
      var name = target.name;
      this.setState(_defineProperty({}, name, target.value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      if (this.state[_constants.PASSWORD] !== this.state[_constants.CONFIRM]) {
        this.setState({
          validationError: 'Your password is inconsistent'
        });
        return false;
      }
      this.props.signup(this.state[_constants.EMAIL], this.state[_constants.PASSWORD]);
    }
  }, {
    key: 'generateInput',
    value: function generateInput() {
      var _PHMap,
          _this2 = this;

      var PHMap = (_PHMap = {}, _defineProperty(_PHMap, _constants.EMAIL, 'Enter your email address'), _defineProperty(_PHMap, _constants.PASSWORD, 'Choose a password'), _defineProperty(_PHMap, _constants.CONFIRM, 'Confirm password'), _PHMap);

      return [_constants.EMAIL, _constants.PASSWORD, _constants.CONFIRM].map(function (v, i) {
        return _react2.default.createElement(
          'div',
          { key: i },
          _react2.default.createElement('input', { id: v, type: v === _constants.CONFIRM ? "password" : v, name: v, placeholder: PHMap[v], onChange: function onChange(event) {
              _this2.handleChange(event);
            } })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { onSubmit: function onSubmit(e) {
              _this3.handleSubmit(e);
            } },
          this.generateInput(),
          _react2.default.createElement(
            'button',
            { type: 'submit', value: 'Submit' },
            'SignUp'
          )
        ),
        this.state.validationError ? _react2.default.createElement(
          'div',
          null,
          this.state.validationError
        ) : _react2.default.createElement('div', null),
        this.props.messages ? _react2.default.createElement(
          'div',
          null,
          this.props.messages
        ) : _react2.default.createElement('div', null),
        this.props.autherrorMessages ? _react2.default.createElement(
          'div',
          null,
          this.props.autherrorMessages
        ) : _react2.default.createElement('div', null)
      );
    }
  }]);

  return Signup;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    autherrorMessages: _.get(state, 'auth.authError.errorMessages', ""),
    messages: _.get(state, 'auth.messages', "")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: function signup(email, password) {
      dispatch((0, _actions.signupUser)({ email: email, password: password }));
    }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Signup);