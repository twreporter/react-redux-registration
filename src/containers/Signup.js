import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { signUpUser } from '../actions'
import { EMAIL, PASSWORD, CONFIRM } from './constants'

const _ = {
  get,
}

class SignUp extends React.Component {
  static fetchData() {
    return new Promise((resolve) => {
      resolve()
    })
  }

  constructor(props) {
    super(props)
    this.state = { [EMAIL]: "", [PASSWORD]: "", [CONFIRM]: "", validationError: "" }
  }

  handleChange(e) {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state[PASSWORD] !== this.state[CONFIRM]) {
        this.setState({
          validationError: 'Your password is inconsistent'
        })
        return false
    }
    this.props.signUp( this.state[EMAIL], this.state[PASSWORD], this.props.apiUrl, this.props.signUpPath )
  }

  generateInput() {
    const PHMap = {
      [EMAIL]: 'Enter your email address',
      [PASSWORD]: 'Choose a password',
      [CONFIRM]: 'Confirm password'
    }

    return [EMAIL, PASSWORD, CONFIRM].map((v,i) => {
      return (
        <div key={i}>
          <input id={v} type={v === CONFIRM ? "password" : v} name={v} placeholder={PHMap[v]} onChange={(event) => {this.handleChange(event)}}/>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          { this.generateInput() }
          <button type="submit" value="Submit">SignUp</button>
        </form>
        { this.state.validationError ? <div>{this.state.validationError}</div> : <div></div>}
        { this.props.messages ? <div>{this.props.messages}</div> : <div></div>}
        { this.props.autherrorMessages ? <div>{this.props.autherrorMessages}</div> : <div></div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    autherrorMessages: _.get(state, 'auth.authError.errorMessages', ""),
    messages: _.get(state, 'auth.messages', ""),
    apiUrl: _.get(state, 'authConfigure.apiUrl', ""),
    signUpPath: _.get(state, 'authConfigure.signUp', "")
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (email, password, apiUrl, signUpPath) => {dispatch(signUpUser({ email, password, apiUrl, signUpPath }))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
