import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { signInUser } from '../actions'
import { EMAIL, PASSWORD } from './constants'
import { apiHost, apiPort, apiEndPoint } from '../../config'

const API_URL = `${apiHost}:${apiPort}`
const query = 'location=http://testtest.twreporter.org:3000&domain=twreporter.org'
const fbLoginUrl = `${API_URL}${apiEndPoint.facebook}?${query}`
const googleLoginUrl = `${API_URL}${apiEndPoint.google}?${query}`

const _ = {
  get,
}

class SignIn extends React.Component {

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
    this.props.signIn( this.state[EMAIL], this.state[PASSWORD], redirect)
  }

  handleOnClick(e) {
    const target = e.target
    const name = target.name
  }

  // PH == plaseholder
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
        { this.props.route.facebook ?
          <button >
            <a href={fbLoginUrl}>Facebook</a>
          </button>
          : <span></span>
        }
        { this.props.route.google ?
          <button >
            <a href={googleLoginUrl}>Google</a>
          </button>
          : <span></span>
        }
        { this.props.messages ? <div>{this.props.messages}</div> : <span></span>}
        { this.props.autherrorMessages ? <div>{this.props.autherrorMessages}</div> : <span></span>}
      </div>
    )
  }
}

SignIn.propTypes = {
  signIn: React.PropTypes.func,
  route: React.PropTypes.object
};


function mapStateToProps(state) {
  return {
    autherrorMessages: _.get(state, 'auth.authError.errorMessages', ""),
    messages: _.get(state, 'auth.messages', "")
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (email, password, redirect) => {dispatch(signInUser({ email, password }, redirect))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
