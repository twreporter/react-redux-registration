import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { signinUser, oAuthFacebook, oAuthGoogle } from '../actions'
import { EMAIL, PASSWORD } from './constants'

const _ = {
  get,
}

class Signin extends React.Component {
  static fetchData() {
    return new Promise((resolve) => {
      resolve()
    })
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { [EMAIL]: "", [PASSWORD]: "" }
  }

  handleChange(e) {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit(e) {
    const redirect = () => {
      this.context.router.push('/features')
    }
    e.preventDefault()
    this.props.signin( this.state[EMAIL], this.state[PASSWORD], redirect)
  }

  handleOnClick(e) {
    const target = e.target
    const name = target.name
    // this.props.oAuthFB()
  }

  generateInput() {
    const PHMap = {
      [EMAIL]: 'Enter your email address',
      [PASSWORD]: 'Choose a password',
    }

    return [EMAIL, PASSWORD].map((v,i) => {
      return (
        <div key={i}>
          <input id={v} type={v} name={v} placeholder={PHMap[v]} onChange={(event) => {this.handleChange(event)}}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          { this.generateInput() }
          <button type="submit" value="Submit">Sign In</button>
        </form>
        <button >
          <a href="http://testtest.twreporter.org:8080/v1/auth/facebook?location=http://testtest.twreporter.org:3000/">Facebook</a>
        </button>
        <button >
          <a href="http://testtest.twreporter.org:8080/v1/auth/google">Google</a>
        </button>
        { this.props.messages ? <div>{this.props.messages}</div> : <div></div>}
        { this.props.autherrorMessages ? <div>{this.props.autherrorMessages}</div> : <div></div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    autherrorMessages: _.get(state, 'auth.authError.errorMessages', ""),
    messages: _.get(state, 'auth.messages', "")
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signin: (email, password, redirect) => {dispatch(signinUser({ email, password }, redirect))},
    oAuthFB: () => {dispatch(oAuthFacebook())},
    oAuthGoogle: () => {dispatch(oAuthGoogle())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
