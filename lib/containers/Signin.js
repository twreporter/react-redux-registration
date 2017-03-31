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

var Signin = function (_React$Component) {
  _inherits(Signin, _React$Component);

  _createClass(Signin, null, [{
    key: 'fetchData',
    value: function fetchData() {
      return new Promise(function (resolve) {
        resolve();
      });
    }
  }]);

  function Signin(props) {
    var _this$state;

    _classCallCheck(this, Signin);

    var _this = _possibleConstructorReturn(this, (Signin.__proto__ || Object.getPrototypeOf(Signin)).call(this, props));

    _this.state = (_this$state = {}, _defineProperty(_this$state, _constants.EMAIL, ""), _defineProperty(_this$state, _constants.PASSWORD, ""), _this$state);
    return _this;
  }

  _createClass(Signin, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var target = e.target;
      var name = target.name;
      this.setState(_defineProperty({}, name, target.value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      var redirect = function redirect() {
        _this2.context.router.push('/features');
      };
      e.preventDefault();
      this.props.signin(this.state[_constants.EMAIL], this.state[_constants.PASSWORD], redirect);
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick(e) {
      var target = e.target;
      var name = target.name;
      // this.props.oAuthFB()
    }
  }, {
    key: 'generateInput',
    value: function generateInput() {
      var _PHMap,
          _this3 = this;

      var PHMap = (_PHMap = {}, _defineProperty(_PHMap, _constants.EMAIL, 'Enter your email address'), _defineProperty(_PHMap, _constants.PASSWORD, 'Choose a password'), _PHMap);

      return [_constants.EMAIL, _constants.PASSWORD].map(function (v, i) {
        return _react2.default.createElement(
          'div',
          { key: i },
          _react2.default.createElement('input', { id: v, type: v, name: v, placeholder: PHMap[v], onChange: function onChange(event) {
              _this3.handleChange(event);
            } })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { onSubmit: function onSubmit(e) {
              _this4.handleSubmit(e);
            } },
          this.generateInput(),
          _react2.default.createElement(
            'button',
            { type: 'submit', value: 'Submit' },
            'Sign In'
          )
        ),
        _react2.default.createElement(
          'button',
          null,
          _react2.default.createElement(
            'a',
            { href: 'http://testtest.twreporter.org:8080/v1/auth/facebook?location=http://testtest.twreporter.org:3000/' },
            'Facebook'
          )
        ),
        _react2.default.createElement(
          'button',
          null,
          _react2.default.createElement(
            'a',
            { href: 'http://testtest.twreporter.org:8080/v1/auth/google' },
            'Google'
          )
        ),
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

  return Signin;
}(_react2.default.Component);

Signin.contextTypes = {
  router: _react2.default.PropTypes.object
};


function mapStateToProps(state) {
  return {
    autherrorMessages: _.get(state, 'auth.authError.errorMessages', ""),
    messages: _.get(state, 'auth.messages', "")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signin: function signin(email, password, redirect) {
      dispatch((0, _actions.signinUser)({ email: email, password: password }, redirect));
    },
    oAuthFB: function oAuthFB() {
      dispatch((0, _actions.oAuthFacebook)());
    },
    oAuthGoogle: function oAuthGoogle() {
      dispatch((0, _actions.oAuthGoogle)());
    }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Signin);