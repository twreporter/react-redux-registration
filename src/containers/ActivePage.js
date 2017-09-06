import PropTypes from 'prop-types'
import React from 'react'
import { activateUser } from '../actions'
import { connect } from 'react-redux'
import { get } from 'lodash'

const _ = {
  get,
}

class ActivePage extends React.PureComponent {
  componentWillMount() {
    // browserHistory = browserHistory of react-router
    // nextRouter = next next/router
    // location = this.props.location from react-router 2.x. Work as indicator to recognize the project env
    // ex: next or react-router
    const { location, activate, browserHistory, activateRedirectPath, nextRouter } = this.props
    let email
    let token
    if (location) {
      email = location.query.email
      token = location.query.token
    } else {
      email = nextRouter.query.email
      token = nextRouter.query.token
    }
    activate(email, token, this.props.apiUrl, this.props.activationPath)
      .then(() => {
        if (location) {
          browserHistory.push(activateRedirectPath)
        } else {
          nextRouter.push(activateRedirectPath)
        }
      })
      .catch(() => {
        console.log('Response for erro. Not decide yet')
      })
  }
  render() {
    return (
      <div>You are redirecting now. Please wait for a few seconds</div>
    )
  }
}

ActivePage.defaultProps = {
  location: {},
  browserHistory: {},
  activateRedirectPath: '',
  nextRouter: {},
  apiUrl: '',
  activationPath: '',
}

ActivePage.propTypes = {
  location: PropTypes.object,
  activate: PropTypes.func.isRequired,
  browserHistory: PropTypes.object,
  activateRedirectPath: PropTypes.string,
  nextRouter: PropTypes.object,
  apiUrl: PropTypes.string,
  activationPath: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    activationPath: _.get(state, 'authConfigure.activate', ''),
  }
}

export default connect(mapStateToProps, { activate: activateUser })(ActivePage)
