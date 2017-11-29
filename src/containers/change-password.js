import { changePassword } from '../actions/authentication'
import { connect } from 'react-redux'
import { NormalButton, Input, Title } from '../components/form-widgets'
import { PASSWORD_PLACEHOLDER, CONFIRM_PLACEHOLDER, INVALID_PASSWORD, INCONSISTENT_PASSWORD } from '../constants/string'
import { PASSWORD, CONFIRM } from '../constants/form'
import { validatePassword } from '../utils/validateForm'
import { ValidationError, AuthError, CompletionText } from '../components/form-info'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

const LocalTitle = Title.extend`
  margin-bottom: 40px
`

const InputContainer = styled.div`
  margin-bottom: 25px;
`

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      [PASSWORD]: '',
      [CONFIRM]: '',
      success: false,
      invalidPassword: '',
      invalidInconsistentPW: '',
      authErrorMessage: '',
    }
    this.handleChange = this._handleChange.bind(this)
    this.handleOnClick = this._handleOnClick.bind(this)
    this.handleOnKeyDown = this._handleOnKeyDown.bind(this)
  }

  _handleChange(e) {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value,
    })
  }

  _validation(clickSetState) {
    if (!validatePassword(this.state[PASSWORD])) {
      clickSetState('invalidPassword', INVALID_PASSWORD)
      return false
    }
    if (this.state[PASSWORD] !== this.state[CONFIRM]) {
      clickSetState('invalidInconsistentPW', INCONSISTENT_PASSWORD)
      return false
    }
    return true
  }

  _handleOnClick() {
    const { password } = this.state
    const { apiUrl, path, location } = this.props
    let email
    let token
    if (location) {
      email = location.query.email
      token = location.query.token
    }
    const clickSetState = (key, value) => {
      const defaultInfoState = {
        success: false,
        invalidPassword: '',
        authErrorMessage: '',
        invalidInconsistentPW: '',
      }
      defaultInfoState[key] = value
      this.setState(defaultInfoState)
    }

    if (!this._validation(clickSetState)) {
      return
    }
    this.props.changePassword(email, password, token, apiUrl, path)
      .then(() => {
        clickSetState('success', true)
      })
      .catch((error) => {
        if (error) {
          clickSetState('authErrorMessage', error.message)
        }
      })
  }

  _handleOnKeyDown(e) {
    if (e.which === 13) {
      this._handleOnClick()
    }
  }

  render() {
    const { title, text } = this.props

    const Inputs = (() => {
      const PHMap = {
        [PASSWORD]: PASSWORD_PLACEHOLDER,
        [CONFIRM]: CONFIRM_PLACEHOLDER,
      }

      return [PASSWORD, CONFIRM].map((v) => {
        const { invalidPassword, invalidInconsistentPW } = this.state
        const error = {
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
    })()
    return (
      <div>
        <LocalTitle>{title}</LocalTitle>
        {this.state.authErrorMessage ? <AuthError>{this.state.authErrorMessage}</AuthError> : null}
        {Inputs}
        <NormalButton
          onClick={this.handleOnClick}
          type="button"
        >
          確認
        </NormalButton>
        {this.state.success ? <CompletionText>{text}</CompletionText> : null }
      </div>
    )
  }
}

ChangePassword.defaultProps = {
  title: '',
  text: '',
  apiUrl: '',
  path: '',
  location: {},
  changePassword: {},
}

ChangePassword.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  apiUrl: PropTypes.string,
  path: PropTypes.string,
  location: PropTypes.object,
  changePassword: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    path: _.get(state, 'authConfigure.changePassword', ''),
  }
}

export default connect(mapStateToProps, { changePassword })(ChangePassword)
