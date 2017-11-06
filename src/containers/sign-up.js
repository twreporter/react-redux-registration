// import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, CONFIRM_PLACEHOLDER, SIGNUP_LABEL, INCONSISTENT_PASSWORD, INVALID_EMAIL, INVALID_PASSWORD, SIGN_UP_CHECK_BOX_LABEL } from '../constants/string'
import { EMAIL, PASSWORD, CONFIRM } from '../constants/form'
import { get } from 'lodash'
import { NormalButtonStyle, Input, InputContainer, CheckBox, Title } from '../components/form-widgets'
import { SignUpForm } from '../styles/common-variables'
import { signUpUser, resetAuthError } from '../actions'
import { validateEmail, validatePassword } from '../utils/validateForm'
import { ValidationError, AuthError } from '../components/form-info'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

const mailChimpURL = '//twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32'

const Form = styled.form`
  width: ${SignUpForm.dimension.width};
`

const SignUpSubFrame = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: inline-block;
`

const SignUpButton = styled.input`
  ${NormalButtonStyle};
  margin: 0;
`

const Policy = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
  width: 275px;
  height: 12px;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #4a4949;
  line-height: 12px;
  a {
    font-weight: bold;
    color: #a67a44;
    &:hover {
      color: #a67a44;
      cursor: pointer;
    }
  }
`

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [EMAIL]: '',
      [PASSWORD]: '',
      [CONFIRM]: '',
      invalidEmail: '',
      invalidPassword: '',
      invalidInconsistentPW: '',
      ifSignUpSuccessfully: false,
      authErrorMessage: '',
      checked: false,
    }
    this.form = {}
    this.handleOnClick = this._handleOnClick.bind(this)
    this.handleOnKeyDown = this._handleOnKeyDown.bind(this)
    this.onClickCheckBox = this._onClickCheckBox.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  // In workflow, the redux state will store all auth errors.
  // There is an property called auth.authErrorMessage exist in redux state.
  // Originally, I used it as indicator to decide whether to show the error message on the app
  // (on form)
  // So to prevent messing up with signin error message, I use setRouteLeaveHook to remove authErrorMessage
  // when user leave the current page.
  // I have modified it and the error message will return by promise and stored in local state.
  // But we may still need this func in the future?
  // componentDidMount() {
  //   if (this.props.route) {
  //     //this setRouteLeaveHook func is provided by the withRouter
  //     //which is imported from react-router
  //     this.props.router.setRouteLeaveHook(this.props.route, () => {
  //       this.props.resetAuthError()
  //     })
  //   }
  // }

  handleChange(e) {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value,
    })
  }

  _handleOnClick(clickSetState) {
    // check validation
    if (!validateEmail(this.state[EMAIL])) {
      clickSetState('invalidEmail', INVALID_EMAIL)
      return Promise.reject()
    }
    if (!validatePassword(this.state[PASSWORD])) {
      clickSetState('invalidPassword', INVALID_PASSWORD)
      return Promise.reject()
    }
    if (this.state[PASSWORD] !== this.state[CONFIRM]) {
      clickSetState('invalidInconsistentPW', INCONSISTENT_PASSWORD)
      // return new Promise.Reject(
      return Promise.reject()
    }
    return this.props.signUp(this.state[EMAIL], this.state[PASSWORD], this.props.apiUrl, this.props.signUpPath)
  }

  _handleSubmit(e) {
    e.preventDefault()
    const clickSetState = (key, value) => {
      const defaultInfoState = {
        invalidEmail: '',
        invalidPassword: '',
        invalidInconsistentPW: '',
        authErrorMessage: '',
        ifSignUpSuccessfully: false,
      }
      defaultInfoState[key] = value
      this.setState(defaultInfoState)
    }
    this._handleOnClick(clickSetState)
      .then(() => {
        clickSetState('ifSignUpSuccessfully', true)
        if (this.state.checked) {
          this.form.submit()
        }
      })
      .catch((errorInfo) => {
        if (errorInfo) {
          clickSetState('authErrorMessage', errorInfo.message)
        }
      })
  }

  _onClickCheckBox() {
    this.setState({
      checked: !this.state.checked,
    })
  }

  _handleOnKeyDown(e) {
    if (e.which === 13) {
      this._handleOnClick()
    }
  }

  generateInput() {
    const PHMap = {
      [EMAIL]: EMAIL_PLACEHOLDER,
      [PASSWORD]: PASSWORD_PLACEHOLDER,
      [CONFIRM]: CONFIRM_PLACEHOLDER,
    }

    return [EMAIL, PASSWORD, CONFIRM].map((v) => {
      const { invalidEmail, invalidPassword, invalidInconsistentPW } = this.state
      const error = {
        [EMAIL]: invalidEmail,
        [PASSWORD]: invalidPassword,
        [CONFIRM]: invalidInconsistentPW,
      }
      return (
        <div key={`key_${v}`}>
          <InputContainer>
            <Input
              id={v}
              type={v === CONFIRM ? PASSWORD : v}
              name={v}
              placeholder={PHMap[v]}
              onChange={(event) => { this.handleChange(event) }}
              onKeyDown={this.handleOnKeyDown}
            />
            { error[v] ? <ValidationError>{error[v]}</ValidationError> : null }
          </InputContainer>
        </div>
      )
    })
  }

  render() {
    return (
      <Form
        action={mailChimpURL}
        method="post"
        name="subscribe-form"
        target="_blank"
        onSubmit={this.handleSubmit}
        novalidate
        innerRef={(node) => { this.form = node }}
      >
        <Title>{this.props.title}</Title>
        <SignUpSubFrame>
          { this.generateInput() }
        </SignUpSubFrame>
        <CheckBox
          text={SIGN_UP_CHECK_BOX_LABEL}
          onToggle={this.onClickCheckBox}
          checked={this.state.checked}
        />
        <Policy>
          透過註冊，你同意報導者的<a>條款及細則</a>與<a>隱私政策</a>
        </Policy>
        <SignUpButton type="submit" value={SIGNUP_LABEL} name="subscribe" />
        { this.state.ifSignUpSuccessfully ? <div>{this.props.signUpMessage}</div> : null}
        { this.state.authErrorMessage ? <AuthError>{this.state.authErrorMessage}</AuthError> : null}
      </Form>
    )
  }
}

SignUp.defaultProps = {
  apiUrl: '',
  signUpPath: '',
  signUpMessage: '',
  title: '',
}

SignUp.propTypes = {
  apiUrl: PropTypes.string,
  signUpPath: PropTypes.string,
  signUpMessage: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  title: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    signUpPath: _.get(state, 'authConfigure.signUp', ''),
  }
}

export default connect(mapStateToProps, { signUp: signUpUser, resetAuthError })(SignUp)
