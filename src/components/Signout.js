import React from 'react'
import { get } from 'lodash'
import { signoutUser } from '../actions'
import { connect } from 'react-redux'

const _ = {
  get,
}

class Signout extends React.Component {
  componentWillMount() {
    this.props.signout()
  }

  render() {
    return(
      <div>
      <div>You are now logged out of The Reporter, please sign in again</div>
      <a href="http://testtest.twreporter.org:3000/signin">signin</a>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => {dispatch(signoutUser())}
  }
}

export default connect(null, mapDispatchToProps)(Signout)
