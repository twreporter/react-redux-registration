import { connect } from 'react-redux'
import { forgetPassword } from '../actions/authentication'
import { NormalButton, Input, Title } from '../components/form-widgets'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { INVALID_EMAIL, FP_EMAIL_PLACEHOLDER, FP_SUCCESS } from '../constants/string'
import { ValidationError, AuthError, CompletionText } from '../components/form-info'
import { validateEmail } from '../utils/validateForm'

const _ = {
  get,
}

const LocalTitle = Title.extend`
  margin-bottom: 40px
`

const InfoText = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1.53;
  letter-spacing: 0.6px;
  text-align: left;
  color: #4a4949;
  margin-bottom: 25px;
`

const InputContainer = styled.div`
  margin-bottom: 25px;
`

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      success: false,
      authError: false,
      invalidEmail: '',
    }
    this.handleChange = this._handleChange.bind(this)
    this.handleOnClick = this._handleOnClick.bind(this)
  }

  _handleChange(e) {
    const target = e.target
    this.setState({
      email: target.value,
    })
  }

  _validation() {
    if (!validateEmail(this.state.email)) {
      this.setState({
        invalidEmail: INVALID_EMAIL,
      })
      return false
    }
    return true
  }

  _handleOnClick() {
    const { email } = this.state
    const { apiUrl, path } = this.props

    if (!this._validation()) {
      return
    }

    this.props.forgetPassword(email, apiUrl, path)
      .then(() => {
        this.setState({
          success: true,
          authError: '',
          invalidEmail: '',
        })
      })
      .catch((error) => {
        this.setState({
          authError: error.message,
          invalidEmail: '',
        })
      })
  }

  render() {
    const { title, infoText } = this.props
    return (
      <div>
        <LocalTitle>{title}</LocalTitle>
        <InfoText>{infoText}</InfoText>
        <InputContainer>
          <Input
            placeholder={FP_EMAIL_PLACEHOLDER}
            id="email_fp"
            type="email"
            name="email"
            onChange={(e) => { this.handleChange(e) }}
            onKeyDown={this.handleOnKeyDown}
            value={this.state.email}
          />
          { this.state.invalidEmail ? <ValidationError>{INVALID_EMAIL}</ValidationError> : null }
        </InputContainer>
        <NormalButton
          onClick={this.handleOnClick}
          type="button"
        >
          傳送
        </NormalButton>
        { this.state.success ? <CompletionText>{FP_SUCCESS}</CompletionText> : null }
        { this.state.authError ? <AuthError>{this.state.authError}</AuthError> : null }
      </div>
    )
  }
}

ForgetPassword.defaultProps = {
  infoText: '',
  title: '',
  apiUrl: '',
  path: '',
  forgetPassword: {},
}

ForgetPassword.propTypes = {
  infoText: PropTypes.string,
  title: PropTypes.string,
  apiUrl: PropTypes.string,
  path: PropTypes.string,
  forgetPassword: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    path: _.get(state, 'authConfigure.forgetPassword', ''),
  }
}

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword)
