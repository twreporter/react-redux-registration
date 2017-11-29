import { connect } from 'react-redux'
import { forgetPassword } from '../actions/authentication'
import { INVALID_EMAIL, FP_EMAIL_PLACEHOLDER, UNREGISTERED_ERROR } from '../constants/string'
import { NormalButton, Input, Title } from '../components/form-widgets'
import { validateEmail } from '../utils/validateForm'
import { ValidationError, AuthError, InfoText } from '../components/form-info'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

const BUTTON_TEXT = '傳送'

const LocalTitle = Title.extend`
  margin-bottom: 40px
`

const InputContainer = styled.div`
  margin-bottom: 25px;
`

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      authError: false,
      invalidEmail: '',
    }
    this.handleChange = this._handleChange.bind(this)
    this.handleOnClick = this._handleOnClick.bind(this)
    this.handleOnKeyDown = this._handleOnKeyDown.bind(this)
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

  _handleOnKeyDown(e) {
    if (e.which === 13) {
      this._handleOnClick()
    }
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
          authError: '',
          invalidEmail: '',
        })
        const { router } = this.props
        router.push('/changepw')
      })
      .catch(() => {
        this.setState({
          authError: UNREGISTERED_ERROR,
          invalidEmail: '',
        })
      })
  }

  render() {
    const { title, infoText } = this.props
    return (
      <div>
        <LocalTitle>{title}</LocalTitle>
        { this.state.authError ? <AuthError>{this.state.authError}</AuthError> : null }
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
          {BUTTON_TEXT}
        </NormalButton>
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
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    path: _.get(state, 'authConfigure.forgetPassword', ''),
  }
}

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword)
