import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { signInUser } from '../actions'
import { EMAIL, PASSWORD } from './constants'

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
    e.preventDefault()
    this.props.signIn( this.state[EMAIL], this.state[PASSWORD], this.props.apiUrl, this.props.signInPath )
      .then(() => {
        this.context.router.push('/features')
      })
      .catch(() => {
        console.log('Response for erro. Not decide yet')
      })
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
    const { apiUrl, facebookPath, googlePath } = this.props
    return (
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          { this.generateInput() }
          <button type="submit" value="Submit">Sign In</button>
        </form>
        { this.props.route.facebook ?
          <button >
            <a href={`${apiUrl}${facebookPath}`}>Facebook</a>
          </button>
          : <span></span>
        }
        { this.props.route.google ?
          <button >
            <a href={`${apiUrl}${googlePath}`}>Google</a>
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
    messages: _.get(state, 'auth.messages', ""),
    apiUrl: _.get(state, 'authConfigure.apiUrl', ""),
    signInPath: _.get(state, 'authConfigure.signIn', ""),
    facebookPath: _.get(state, 'authConfigure.oAuthProviders.facebook', ""),
    googlePath: _.get(state, 'authConfigure.oAuthProviders.google', "")
  }
}

export default connect(mapStateToProps, {signIn: signInUser} )(SignIn)
