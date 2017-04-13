import React from 'react'
import { get } from 'lodash'
import { signOutUser } from '../actions'
import { connect } from 'react-redux'

const _ = {
  get,
}

class SignOut extends React.Component {
  componentWillMount() {
    this.props.signOut()
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
    signOut: () => {dispatch(signOutUser())}
  }
}

export default connect(null, mapDispatchToProps)(SignOut)
