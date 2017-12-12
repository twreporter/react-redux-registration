// import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, CONFIRM_PLACEHOLDER, SIGNUP_LABEL, INVALID_EMAIL, SIGN_UP_CHECK_BOX_LABEL, CONFLICTING_ACCOUNT, DEFAULT_API_ERROR } from '../constants/string'
import { EMAIL, PASSWORD, CONFIRM } from '../constants/form'
import { get } from 'lodash'
import { NormalButtonStyle, Input, InputContainer, CheckBox, Title } from '../components/form-widgets'
import { signInUser, resetAuthError } from '../actions'
import { validateEmail } from '../utils/validateForm'
import { ValidationError, AuthError } from '../components/form-info'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

const ACCOUNT_CONFLICT_MSG = 'Account is already signup'
// This is for original design
// const INPUT_CONTENT = [EMAIL, PASSWORD, CONFIRM]
const INPUT_CONTENT = [EMAIL]

const SignUpSubFrame = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: inline-block;
`

const SignUpButton = styled.input`
  ${NormalButtonStyle};
  display: block;
  margin-top: 25px;
`

/*
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

<Policy>
  透過註冊，你同意報導者的<a>條款及細則</a>與<a>隱私政策</a>
</Policy>
*/

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [EMAIL]: '',
      invalidEmail: '',
      authErrorMessage: '',
      checked: false,
    }
    this.handleOnClick = this._handleOnClick.bind(this)
    this.handleOnKeyDown = this._handleOnKeyDown.bind(this)
    this.onClickCheckBox = this._onClickCheckBox.bind(this)
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

  _validationCheck(clickSetState) {
    // check validation
    if (!validateEmail(this.state[EMAIL])) {
      clickSetState('invalidEmail', INVALID_EMAIL)
      return false
    }
    /*
    if (!validatePassword(this.state[PASSWORD])) {
      clickSetState('invalidPassword', INVALID_PASSWORD)
      return false
    }
    if (this.state[PASSWORD] !== this.state[CONFIRM]) {
      clickSetState('invalidInconsistentPW', INCONSISTENT_PASSWORD)
      // return new Promise.Reject(
      return false
    }
    */
    return true
  }

  _handleOnClick() {
    const { location, apiUrl, signInPath, host } = this.props
    const destinationPath = _.get(location, 'query.destinationPath', '')
    const clickSetState = (key, value) => {
      const defaultInfoState = {
        invalidEmail: '',
        invalidInconsistentPW: '',
        authErrorMessage: '',
      }
      defaultInfoState[key] = value
      this.setState(defaultInfoState)
    }
    if (!this._validationCheck(clickSetState)) {
      return
    }
    const destination = destinationPath ? `${host}/${destinationPath}` : `${host}`
    this.props.signUp(this.state[EMAIL], apiUrl, signInPath, destination)
      .then(() => {
        const { router, redirectPath } = this.props
        const { checked } = this.state
        const checkedVlaue = checked ? 'true' : 'false'
        router.push(`/${redirectPath}?checked=${checkedVlaue}&email=${this.state[EMAIL]}&action=signUp`)
      })
      .catch((errorInfo) => {
        if (errorInfo) {
          const errorObj = errorInfo.status
          const { data, status } = errorObj
          if (status === 409 && data.message === ACCOUNT_CONFLICT_MSG) {
            clickSetState('authErrorMessage', CONFLICTING_ACCOUNT)
          } else {
            clickSetState('authErrorMessage', DEFAULT_API_ERROR)
          }
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

    return INPUT_CONTENT.map((v) => {
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
      <div>
        <Title>{this.props.title}</Title>
        { this.state.authErrorMessage ? <AuthError>{this.state.authErrorMessage}</AuthError> : null}
        <SignUpSubFrame>
          { this.generateInput() }
        </SignUpSubFrame>
        <CheckBox
          text={SIGN_UP_CHECK_BOX_LABEL}
          onToggle={this.onClickCheckBox}
          checked={this.state.checked}
        />
        <SignUpButton type="button" value={SIGNUP_LABEL} name="subscribe" onClick={this.handleOnClick} />
      </div>
    )
  }
}

SignUp.defaultProps = {
  apiUrl: '',
  signInPath: '',
  signUpMessage: '',
  title: '',
}

SignUp.propTypes = {
  apiUrl: PropTypes.string,
  signInPath: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  title: PropTypes.string,
  router: PropTypes.object.isRequired,
  redirectPath: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  host: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    signInPath: _.get(state, 'authConfigure.signIn', ''),
    host: _.get(state, 'authConfigure.host'),
  }
}

export default connect(mapStateToProps, { signUp: signInUser, resetAuthError })(SignUp)
