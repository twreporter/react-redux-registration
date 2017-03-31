import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { get } from 'lodash'

const _ = {
  get,
}

export default (ComposedComponent) => {
  class AuthenticationScreen extends React.Component {

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/signup')
      }
    }

    componentWillUpdate() {
      if(!this.props.authenticated) {
        this.context.router.push('/signup')
      }
    }

    render () {
      return <ComposedComponent  {...this.props}/>
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: _.get(state, 'auth.authenticated', false)
    }
  }

  AuthenticationScreen.contextTypes = {
    router: React.PropTypes.object
  }

  return connect(mapStateToProps)(AuthenticationScreen)
}
