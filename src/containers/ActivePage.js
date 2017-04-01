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
    const redirect = () => {
      this.context.router.push('/features')
    }
    this.props.activate(email, activeCode, redirect)
  }
  render() {
    return (
      <div>You are redirecting now. Please wait for a few seconds</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    activate: (email, activeCode, redirect) => { dispatch(activateUser( { email, activeCode }, redirect)) }
  }
}

export default connect(null, mapDispatchToProps)(ActivePage)
