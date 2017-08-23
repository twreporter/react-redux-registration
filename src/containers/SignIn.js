import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Link } from 'react-router'
import { NormalButton } from '../components/form-buttons'
import { signInUser, resetAuthError } from '../actions'
import { SignInForm, font } from '../styles/common-variables'
import { ACCOUNT_LABEL, PASSWORD_LABEL, SIGN_IN, SIGN_UP } from '../constants/string'
import { EMAIL, PASSWORD } from '../constants/form'

const _ = {
  get,
}

const Title = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${SignInForm.title.fontSize};
  color: ${font.color}
`

const Frame = styled.div`
  width: ${SignInForm.dimension.width};
`

const SigInSubFrame = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border: ${props => (props.defaultStyle ? '1px solid #d8dee2' : 'none')};
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
`

const SignUpSubFrame = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border: ${props => (props.defaultStyle ? '1px solid #d8dee2' : 'none')};
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  font-size: ${font.size.base};
`

const Input = styled.input`
  margin-top: 10px;
  margin-bottom: 17px;
  width:100%;
  height: ${SignInForm.inputs.height};
  box-sizing : border-box;
  border: 1px solid #d8dee2;
  border-radius: 3px;
  &:focus {
    outline: none;
    border:1px solid #719ECE;
    box-shadow: 0 0 8px #7cb6f4;
 }
`

const SignInButton = NormalButton.extend``

const LinkStyle = styled.span`
  color: #0366D6;
  opacity: 0.7;
  &:hover {
    cursor: pointer;
  }
`
class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [EMAIL]: '',
      [PASSWORD]: '',
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

  // historyManager = Router of next or browserHistory of react-router
  _handleOnClick() {
    const { signIn, historyManager, signInRedirectPath } = this.props
    signIn(this.state[EMAIL], this.state[PASSWORD], this.props.apiUrl, this.props.signInPath)
      .then(() => {
        historyManager.push(signInRedirectPath)
      })
      .catch((errorInfo) => {
        this.setState({
          authErrorMessage: _.get(errorInfo, 'message', 'default error!'),
        })
      })
  }

  _handleOnKeyDown(e) {
    if (e.which === 13) {
      this._handleOnClick()
    }
  }

  generateInput() {
    // label for input
    const label = {
      [EMAIL]: ACCOUNT_LABEL,
      [PASSWORD]: PASSWORD_LABEL,
    }

    return [EMAIL, PASSWORD].map((v) => {
      return (
        <div key={v}>
          <label htmlFor={v}>{`${label[v]}:`}</label>
          <Input id={v} type={v} name={v} onChange={(e) => { this.handleChange(e) }} onKeyDown={this.handleOnKeyDown} />
        </div>
      )
    })
  }

  render() {
    const { title, NextLink, account, defaultStyle } = this.props

    const signUpArea = (() => {
      // in next project, developer has to pass Link from 'next/link' to props.NextLink
      if (NextLink) {
        return (
          <div>
            <span>{`${SIGN_UP.plainText}`}&nbsp;</span>
            <NextLink href="/signup"><a>{`${SIGN_UP.linkText}`}</a></NextLink>
          </div>
        )
      }
      return (
        <div>
          <span>{`${SIGN_UP.plainText}`}&nbsp;</span>
          <Link to="/signup"><LinkStyle>{`${SIGN_UP.linkText}`}</LinkStyle></Link>
        </div>
      )
    })()

    const signInArea = (() => {
      return (
        <SigInSubFrame defaultStyle={defaultStyle}>
          {
            account ?
              <div>
                { this.generateInput() }
                <SignInButton
                  onClick={this.handleOnClick}
                  type="button"
                >
                  {`${SIGN_IN}`}
                </SignInButton>
              </div>
              : <span />
          }
          {this.props.children}
        </SigInSubFrame>
      )
    })()

    const theForm = (() => {
      return (
        <div>
          <Title>{`${title}`}</Title>
          {signInArea}
          { account ? <SignUpSubFrame defaultStyle={defaultStyle}>{signUpArea}</SignUpSubFrame> : <span /> }
          { this.state.authErrorMessage ? <div>{this.state.authErrorMessage}</div> : <span /> }
        </div>
      )
    })()

    const formWrapper = (() => {
      if (this.props.defaultStyle) {
        return <Frame>{theForm}</Frame>
      }
      return <div>{theForm}</div>
    })()

    return (
      <div>{formWrapper}</div>
    )
  }
}

SignIn.defaultProps = {
  apiUrl: '',
  signIn: () => {},
  signInPath: '',
  title: '',
  historyManager: {},
  signInRedirectPath: '',
  NextLink: undefined,
  children: null,
}

SignIn.propTypes = {
  apiUrl: PropTypes.string,
  signIn: PropTypes.func,
  signInPath: PropTypes.string,
  title: PropTypes.string,
  historyManager: PropTypes.object,
  signInRedirectPath: PropTypes.string,
  account: PropTypes.bool.isRequired,
  defaultStyle: PropTypes.bool.isRequired,
  NextLink: PropTypes.element,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    signInPath: _.get(state, 'authConfigure.signIn', ''),
  }
}

export default connect(mapStateToProps, { signIn: signInUser, resetAuthError })(SignIn)
