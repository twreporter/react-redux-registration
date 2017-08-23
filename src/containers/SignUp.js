import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { NormalButton } from '../components/form-buttons'
import { signUpUser, resetAuthError } from '../actions'
import { SignUpForm, font } from '../styles/common-variables'
// import { withRouter } from 'react-router'
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, CONFIRM_PLACEHOLDER, SIGNUP_LABEL, INCONSISTENT_PASSWORD } from '../constants/string'
import { EMAIL, PASSWORD, CONFIRM } from '../constants/form'

const _ = {
  get,
}

const Title = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${SignUpForm.title.fontSize};
  color: ${font.color}
`

const Frame = styled.div`
  width: ${SignUpForm.dimension.width};
`

const SignUpSubFrame = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
`

const Input = styled.input`
  margin-top: 10px;
  margin-bottom: 17px;
  width:100%;
  height: ${SignUpForm.inputs.height};
  box-sizing : border-box;
  border: 1px solid #d8dee2;
  border-radius: 3px;
  &:focus {
    outline: none !important;
    border:1px solid #719ECE;
    box-shadow: 0 0 8px #7cb6f4;
 }
`

const SignUpButton = NormalButton.extend``

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [EMAIL]: '',
      [PASSWORD]: '',
      [CONFIRM]: '',
      validationError: '',
      ifSignUpSuccessfully: false,
      authErrorMessage: '',
    }
    this.handleOnClick = this._handleOnClick.bind(this)
    this.handleOnKeyDown = this._handleOnKeyDown.bind(this)
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

  _handleOnClick() {
    // check validation
    if (this.state[PASSWORD] !== this.state[CONFIRM]) {
      this.setState({
        validationError: INCONSISTENT_PASSWORD,
        authErrorMessage: '',
      })
      // prevent program run to following statements
      return
    }
    this.props.signUp(this.state[EMAIL], this.state[PASSWORD], this.props.apiUrl, this.props.signUpPath)
      .then(() => {
        this.setState({
          validationError: '',
          ifSignUpSuccessfully: true,
        })
      })
      .catch((errorInfo) => {
        this.setState({
          validationError: '',
          authErrorMessage: errorInfo.message,
        })
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
      return (
        <div key={`key_${v}`}>
          <Input
            id={v}
            type={v === CONFIRM ? PASSWORD : v}
            name={v}
            placeholder={PHMap[v]}
            onChange={(event) => { this.handleChange(event) }}
            onKeyDown={this.handleOnKeyDown}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <Frame>
        <Title>{this.props.title}</Title>
        <SignUpSubFrame>
          { this.generateInput() }
          <SignUpButton
            type="button"
            onClick={this.handleOnClick}
          >
            {SIGNUP_LABEL}
          </SignUpButton>
        </SignUpSubFrame>
        { this.state.validationError ? <div>{this.state.validationError}</div> : null}
        { this.state.ifSignUpSuccessfully ? <div>{this.props.signUpMessage}</div> : null}
        { this.state.authErrorMessage ? <div>{this.state.authErrorMessage}</div> : null}
      </Frame>
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
