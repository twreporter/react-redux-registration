import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


class Features extends React.Component {
  render() {
    return (
      <div>
        <div>this is feature page</div>
        <Link to="/signout">Signout</Link>
      </div>
    )
  }
}

export default connect()(Features)
