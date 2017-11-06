import React from 'react'
import SignInPrototype from './sign-in-prototype'
import { withRouter } from 'react-router'

const SignInReact = (props) => {
  return (
    <SignInPrototype
      {...props}
    />
  )
}


export default withRouter(SignInReact)
