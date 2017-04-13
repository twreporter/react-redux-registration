import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { activateUser } from '../actions'

const _ = {
  get,
}

class ActivePage extends React.Component{
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    const query = this.props.location.query
    const email = query.email
    const activeCode = query.token
    this.props.activate(email, activeCode, this.props.apiUrl, this.props.activationPath)
      .then(() => {
        this.context.router.push('/features')
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

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ""),
    activationPath: _.get(state, 'authConfigure.activate', "")
  }
}

export default connect(mapStateToProps, { activate: activateUser })(ActivePage)
