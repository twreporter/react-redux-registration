import { ACCOUNT_LABEL, PASSWORD_LABEL, SIGN_IN, INVALID_EMAIL, SIGN_UP, SIGN_IN_CHECK_BOX_LABEL, DEFAULT_API_ERROR } from '../constants/string'
import { connect } from 'react-redux'
import { EMAIL, PASSWORD } from '../constants/form'
import { localStorageKeys } from '../config/config'
import { NormalButton, Input, InputContainer, Title, CheckBox } from '../components/form-widgets'
import { setupTokenInLocalStorage, tokenExpirationChecker } from '../utils/tokenManager'
import { dimension, colors } from '../styles/common-variables'
import { signInUser, resetAuthError } from '../actions'
import { validateEmail } from '../utils/validateForm'
import { ValidationError, AuthError } from '../components/form-info'
import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

const _ = {
  get,
}

const { checkedInfo, redirectLocation } = localStorageKeys
const { formWidth } = dimension

const Frame = styled.div`
  width: ${formWidth};
`

const SigInSubFrame = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  box-sizing: border-box;
  display: inline-block;
`

const SignUpSubFrame = styled.div`
  width: 100%;
  height: 13px;
  line-height: 13px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 13px;
`
const Division = styled.div`
  width: ${formWidth};
  position: relative;
  text-align: center;
  height: 12px;
  margin: 25px 0 25px 0;
`

const DivisionLine = styled.div`
  display: inline-block;
  width: 127px;
  opacity: 0.2;
  height: 2px;
  background-color: ${colors.textBlack};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const DivisionLineLeft = DivisionLine.extend`
  left: 0;
`

const DivisionLineRight = DivisionLine.extend`
  right: 0;
`

const DivisionText = styled.div`
  width: 12px;
  height: 12px;
  opacity: 0.3;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-align: center;
  color: ${colors.textBlack};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  line-height: 12px;
`

const SignInButton = NormalButton.extend`
  margin: 0;
`

const UtilFrame = styled.div`
  margin: 0 0 39px 0;
  height: 29px;
`

const LinkStyle = styled.div`
  display: inline-block;
  a {
    font-size: 13px;
    font-weight: bold;
    color: #a67a44;
    &:hover {
      color: #a67a44;
      cursor: pointer;
    }
  }
`

// const ForgetPassword = LinkStyle.extend`
//   height: 29px;
//   line-height: 29px;
//   float: right;
// `

class SignInPrototype extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [EMAIL]: '',
      [PASSWORD]: '',
      authErrorMessage: '',
      validationErrorEmail: '',
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

  componentWillMount() {
    const { ifAuthenticated } = this.props
    if (ifAuthenticated) {
      const { router } = this.props
      router.push('/')
    }
  }

  componentDidMount() {
    const { destinationPath, host } = this.props
    tokenExpirationChecker(32, checkedInfo)
    const checkedInfoString = localStorage.getItem(checkedInfo)
    const checkedInfoObj = JSON.parse(checkedInfoString)
    if (checkedInfoObj) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        [EMAIL]: checkedInfoObj.account,
        checked: true,
      })
    }
    if (destinationPath) {
      const bookmarkData = {
        destination: destinationPath ? `${host}/${destinationPath}` : `${host}`,
      }
      localStorage.setItem(redirectLocation, JSON.stringify(bookmarkData))
    }
  }

  handleChange(e) {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value,
    })
  }

  _validation() {
    if (!validateEmail(this.state[EMAIL])) {
      this.setState({
        validationErrorEmail: INVALID_EMAIL,
        authErrorMessage: '',
      })
      return false
    }
    /*
    if (!validatePassword(this.state[PASSWORD])) {
      this.setState({
        validationErrorEmail: '',
        validationErrorPassword: INVALID_PASSWORD,
      })
      return false
    }
    */
    return true
  }

  _handleOnClick() {
    const { signIn, router, signInRedirectPath, apiUrl, signInPath, host, destinationPath } = this.props

    if (!this._validation()) {
      return
    }

    if (this.state.checked) {
      setupTokenInLocalStorage({ account: this.state[EMAIL] }, checkedInfo)
    } else {
      localStorage.removeItem(checkedInfo)
    }

    this.setState({
      validationErrorEmail: '',
    }, () => {
      const destination = destinationPath ? `${host}/${destinationPath}` : `${host}`
      signIn(this.state[EMAIL], apiUrl, signInPath, destination)
        .then(() => {
          router.push(`/${signInRedirectPath}?checked=false&action=signIn&email=${this.state[EMAIL]}`)
        })
        .catch(() => {
          this.setState({
            authErrorMessage: DEFAULT_API_ERROR,
          })
        })
    })
  }

  _handleOnKeyDown(e) {
    if (e.which === 13) {
      this._handleOnClick()
    }
  }

  _onClickCheckBox(v) {
    this.setState({
      checked: v,
    })
  }

  generateInput() {
    // label for input
    const label = {
      [EMAIL]: ACCOUNT_LABEL,
      [PASSWORD]: PASSWORD_LABEL,
    }

    const error = {
      [EMAIL]: this.state.validationErrorEmail,
      [PASSWORD]: this.state.validationErrorPassword,
    }

    return [EMAIL].map((v) => {
      return (
        <div key={v}>
          <InputContainer>
            <Input
              placeholder={`${label[v]}: `}
              id={v}
              type={v}
              name={v}
              onChange={(e) => { this.handleChange(e) }}
              onKeyDown={this.handleOnKeyDown}
              value={this.state[v]}
            />
            { error[v] ? <ValidationError>{error[v]}</ValidationError> : null }
          </InputContainer>
        </div>
      )
    })
  }
  render() {
    const { title, destinationPath } = this.props
    const signInArea = (() => {
      return (
        <SigInSubFrame>
          {
            this.props.children ?
              <div>
                {this.props.children}
                <Division>
                  <DivisionLineLeft />
                  <DivisionText>或</DivisionText>
                  <DivisionLineRight />
                </Division>
              </div>
              : null
          }
          <div>
            { this.state.authErrorMessage ? <AuthError>{this.state.authErrorMessage}</AuthError> : null }
            { this.generateInput() }
            <UtilFrame>
              <CheckBox
                text={SIGN_IN_CHECK_BOX_LABEL}
                onToggle={this.onClickCheckBox}
                checked={this.state.checked}
              />
              {/*
              <ForgetPassword>
                <Link to="/forgetpw">
                  {RESET_PASSWORD_REDIRECT}
                </Link>
              </ForgetPassword>
              */}
            </UtilFrame>
            <SignInButton
              onClick={this.handleOnClick}
              type="button"
            >
              {`${SIGN_IN}`}
            </SignInButton>
          </div>
        </SigInSubFrame>
      )
    })()
    const signUpArea = (() => {
      const toUrl = destinationPath ? `/signup?destinationPath=${destinationPath}` : '/signup'
      return (
        <SignUpSubFrame>
          <span>{`${SIGN_UP.plainText}`}&nbsp;</span>
          <LinkStyle><Link to={toUrl}>{`${SIGN_UP.linkText}`}</Link></LinkStyle>
        </SignUpSubFrame>
      )
    })()

    const Form = (() => {
      return (
        <div>
          <Title>{`${title}`}</Title>
          {signInArea}
          {signUpArea}
        </div>
      )
    })()

    const formWrapper = (() => {
      return <Frame>{Form}</Frame>
    })()
    if (!this.props.ifAuthenticated) {
      return (
        <div>{formWrapper}</div>
      )
    }
    return null
  }
}

SignInPrototype.defaultProps = {
  apiUrl: '',
  signIn: () => {},
  signInPath: '',
  title: '',
  signInRedirectPath: '',
  children: null,
  ifAuthenticated: false,
  destinationPath: '',
}

SignInPrototype.propTypes = {
  apiUrl: PropTypes.string,
  signIn: PropTypes.func,
  signInPath: PropTypes.string,
  title: PropTypes.string,
  router: PropTypes.object.isRequired,
  signInRedirectPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ifAuthenticated: PropTypes.bool,
  host: PropTypes.string.isRequired,
  destinationPath: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    signInPath: _.get(state, 'authConfigure.signIn', ''),
    ifAuthenticated: _.get(state, 'auth.authenticated', false),
    host: _.get(state, 'authConfigure.host'),
  }
}

export default connect(mapStateToProps, { signIn: signInUser, resetAuthError })(SignInPrototype)
